import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { chromium, type Browser, type Page } from 'playwright';
import { languages } from '../../src/contexts/language.ts';
import { serveDist } from './serve.ts';

const { values } = parseArgs({
  options: {
    baseline: { type: 'string' },
    threshold: { type: 'string', default: '0' },
  },
});

if (!values.baseline) {
  throw new Error('--baseline <dir> names the build to compare dist/ against');
}

const artifactsDir = fileURLToPath(new URL('../../parity-artifacts', import.meta.url));

const viewports = {
  desktop: { width: 1280, height: 720 },
  mobile: { width: 390, height: 844 },
};

async function openLanguage(
  page: Page,
  origin: string,
  { path }: (typeof languages)[number],
  javaScript: boolean,
) {
  const response = await page.goto(`${origin}${path}`);

  if (response?.status() === 404 && javaScript) {
    await switchSinglePageBaselineToIndonesian(page, origin);
  }
}

async function switchSinglePageBaselineToIndonesian(page: Page, origin: string) {
  await page.goto(origin);
  await page.getByRole('combobox', { name: 'Language' }).click();
  await page.getByRole('option', { name: 'Indonesia' }).click();
  await page.getByRole('listbox').waitFor({ state: 'detached' });
  await page.getByRole('combobox', { name: 'Language' }).blur();
}

async function settle(page: Page, javaScript: boolean) {
  await page.evaluate(() => document.fonts.ready);

  if (!javaScript) {
    return;
  }

  await page.waitForTimeout(4000);

  for (const section of await page.locator('section').all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(4000);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
}

async function capture(
  browser: Browser,
  origin: string,
  shot: {
    viewport: keyof typeof viewports;
    language: (typeof languages)[number];
    javaScript: boolean;
  },
) {
  const context = await browser.newContext({
    viewport: viewports[shot.viewport],
    javaScriptEnabled: shot.javaScript,
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  await openLanguage(page, origin, shot.language, shot.javaScript);
  await settle(page, shot.javaScript);

  const photoReencodedAsAvif = page.getByRole('img', { name: 'Profile Picture' });

  const logosRasterizedAsImages = page.locator('#skills a > *');

  const image = await page.screenshot({
    fullPage: true,
    mask: [photoReencodedAsAvif, logosRasterizedAsImages],
  });

  await context.close();

  return image;
}

async function countMismatches(browser: Browser, baseline: Buffer, current: Buffer) {
  const page = await browser.newPage();

  const result = await page.evaluate(
    async ({ baselineUrl, currentUrl }) => {
      const load = async (url: string) => {
        const image = new Image();

        image.src = url;
        await image.decode();

        const canvas = document.createElement('canvas');

        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d', { willReadFrequently: true });

        if (!context) {
          throw new Error('A fresh canvas has a 2d context');
        }

        context.drawImage(image, 0, 0);

        return { canvas, context, pixels: context.getImageData(0, 0, image.width, image.height) };
      };

      const before = await load(baselineUrl);

      const after = await load(currentUrl);

      if (
        before.pixels.width !== after.pixels.width ||
        before.pixels.height !== after.pixels.height
      ) {
        return {
          mismatched: Number.POSITIVE_INFINITY,
          size: `${before.pixels.width}x${before.pixels.height} vs ${after.pixels.width}x${after.pixels.height}`,
          diff: '',
        };
      }

      const diff = after.context.createImageData(after.pixels.width, after.pixels.height);

      const beforeWords = new Uint32Array(before.pixels.data.buffer);

      const afterWords = new Uint32Array(after.pixels.data.buffer);

      const diffWords = new Uint32Array(diff.data.buffer);

      const [same = 0, changed = 0] = [
        [0, 0, 0, 40],
        [255, 0, 0, 255],
      ].map((rgba) => new Uint32Array(new Uint8Array(rgba).buffer)[0]);

      let mismatched = 0;

      for (let index = 0; index < beforeWords.length; index += 1) {
        const differs = beforeWords[index] !== afterWords[index];

        diffWords[index] = differs ? changed : same;
        mismatched += differs ? 1 : 0;
      }

      after.context.putImageData(diff, 0, 0);

      return {
        mismatched,
        size: `${after.pixels.width}x${after.pixels.height}`,
        diff: after.canvas.toDataURL('image/png'),
      };
    },
    {
      baselineUrl: `data:image/png;base64,${baseline.toString('base64')}`,
      currentUrl: `data:image/png;base64,${current.toString('base64')}`,
    },
  );

  await page.close();

  return result;
}

const baselineSite = await serveDist(resolve(values.baseline));

const currentSite = await serveDist();

const browser = await chromium.launch();

const rows: Record<string, { size: string; mismatched: number }> = {};

await mkdir(artifactsDir, { recursive: true });

try {
  for (const viewport of ['desktop', 'mobile'] as const) {
    for (const language of languages) {
      const baseline = await capture(browser, baselineSite.url, {
        viewport,
        language,
        javaScript: true,
      });

      await writeFile(`${artifactsDir}/${viewport}-${language.value}-baseline.png`, baseline);

      for (const javaScript of [true, false]) {
        const name = `${viewport}-${language.value}-${javaScript ? 'js' : 'no-js'}`;

        const current = await capture(browser, currentSite.url, { viewport, language, javaScript });

        const { mismatched, size, diff } = await countMismatches(browser, baseline, current);

        await writeFile(`${artifactsDir}/${name}.png`, current);

        if (diff) {
          await writeFile(
            `${artifactsDir}/${name}-diff.png`,
            Buffer.from(diff.replace('data:image/png;base64,', ''), 'base64'),
          );
        }

        rows[name] = { size, mismatched };
      }
    }
  }
} finally {
  await browser.close();
  await baselineSite.close();
  await currentSite.close();
}

console.table(rows);

if (Object.values(rows).some(({ mismatched }) => mismatched > Number(values.threshold))) {
  console.error(`Screenshots differ from the baseline by more than ${values.threshold} pixels`);
  process.exitCode = 1;
}
