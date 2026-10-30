import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unicodeRange } from './unicode-range.ts';

const source = 'https://rsms.me/inter/font-files/InterVariable.woff2?v=4.1';

const output = fileURLToPath(
  new URL('../../src/assets/fonts/inter-variable-latin.woff2', import.meta.url),
);

const response = await fetch(source);

if (!response.ok) {
  throw new Error(`${source} answered ${response.status}`);
}

const workDir = await mkdtemp(join(tmpdir(), 'fama-font-'));

const input = join(workDir, 'InterVariable.woff2');

await writeFile(input, Buffer.from(await response.arrayBuffer()));

// Chrome on macOS anti-aliases the text differently without the glyph names, and narrowing the
// wght axis shifts outlines, so the subset keeps both.
execFileSync(
  'uvx',
  [
    '--from',
    'fonttools[woff,brotli]==4.68.0',
    'pyftsubset',
    input,
    `--unicodes=${unicodeRange}`,
    '--glyph-names',
    '--flavor=woff2',
    `--output-file=${output}`,
  ],
  { stdio: 'inherit' },
);

await rm(workDir, { recursive: true });
