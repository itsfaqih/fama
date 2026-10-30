import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import lighthouse from 'lighthouse';
import { chromium } from 'playwright';
import { serveDist } from '../static-site/serve.ts';

const networks = {
  // Lighthouse's Regular 3G: 300 ms round trip, 700 Kbps, phone CPU 4x slower than this machine.
  'regular-3g': { rttMs: 300, throughputKbps: 700, cpuSlowdownMultiplier: 4 },
  // Chrome DevTools' 3G preset (formerly Slow 3G): 400 ms round trip, 400 Kbps.
  'devtools-3g': { rttMs: 400, throughputKbps: 400, cpuSlowdownMultiplier: 4 },
};

type Network = keyof typeof networks;

const metricIds = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'speed-index',
  'interactive',
  'total-byte-weight',
] as const;

const { values } = parseArgs({
  options: {
    network: { type: 'string', default: 'regular-3g' },
    runs: { type: 'string', default: '5' },
    path: { type: 'string', multiple: true, default: ['/'] },
    budget: { type: 'string', default: '3000' },
    label: { type: 'string', default: 'current' },
  },
});

function isNetwork(name: string): name is Network {
  return name in networks;
}

if (!isNetwork(values.network)) {
  throw new Error(`--network must be one of ${Object.keys(networks).join(', ')}`);
}

const network = values.network;

const runs = Number(values.runs);

const budgetMs = Number(values.budget);

const artifactsDir = fileURLToPath(
  new URL(`../../perf-artifacts/${values.label}`, import.meta.url),
);

async function launchChrome() {
  const userDataDir = await mkdtemp(join(tmpdir(), 'fama-perf-'));

  const chrome = spawn(chromium.executablePath(), [
    '--headless=new',
    '--remote-debugging-port=0',
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
  ]);

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const portFile = await readFile(join(userDataDir, 'DevToolsActivePort'), 'utf8').catch(
      () => '',
    );

    if (portFile) {
      return {
        port: Number(portFile.split('\n')[0]),
        close: async () => {
          const exited = new Promise((resolve) => chrome.once('exit', resolve));

          chrome.kill();
          await exited;
          await rm(userDataDir, { recursive: true, force: true });
        },
      };
    }

    await delay(100);
  }

  chrome.kill();
  throw new Error('Chromium did not open a debugging port');
}

function median(numbers: number[]) {
  const sorted = [...numbers].sort((a, b) => a - b);

  return sorted[Math.floor(sorted.length / 2)] ?? Number.NaN;
}

const site = await serveDist();

const chrome = await launchChrome();

const failures: string[] = [];

await mkdir(artifactsDir, { recursive: true });

try {
  for (const path of values.path) {
    const samples = new Map<string, number[]>();

    const record = (id: string, value: number) =>
      samples.set(id, [...(samples.get(id) ?? []), value]);

    for (let run = 0; run < runs; run += 1) {
      const result = await lighthouse(
        `${site.url}${path}`,
        { port: chrome.port, logLevel: 'error', onlyCategories: ['performance'] },
        {
          extends: 'lighthouse:default',
          settings: { throttlingMethod: 'simulate', throttling: networks[network] },
        },
      );

      if (!result) {
        throw new Error(`Lighthouse returned nothing for ${path}`);
      }

      const { audits, runtimeError } = result.lhr;

      if (runtimeError) {
        throw new Error(`Lighthouse failed on ${path}: ${runtimeError.message}`);
      }

      for (const id of metricIds) {
        record(id, audits[id]?.numericValue ?? Number.NaN);
      }

      const requests = audits['network-requests']?.details;

      record('requests', requests?.type === 'table' ? requests.items.length : Number.NaN);

      const name = path.replaceAll('/', '_') || '_';

      await writeFile(join(artifactsDir, `${network}${name}-run${run + 1}.json`), result.report);
    }

    const summary = Object.fromEntries(
      [...samples].map(([id, list]) => [
        id,
        {
          median: Math.round(median(list)),
          min: Math.round(Math.min(...list)),
          max: Math.round(Math.max(...list)),
        },
      ]),
    );

    console.log(`\n${values.label} ${path} on ${network}, ${runs} runs`);
    console.table(summary);

    for (const id of ['largest-contentful-paint', 'interactive']) {
      const value = summary[id]?.median ?? Number.NaN;

      if (!(value < budgetMs)) {
        failures.push(`${path} ${id} median ${value} ms is over ${budgetMs} ms`);
      }
    }
  }
} finally {
  await chrome.close();
  await site.close();
}

if (failures.length > 0) {
  console.error(`\nOver budget:\n${failures.join('\n')}`);
  process.exitCode = 1;
}
