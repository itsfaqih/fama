import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const stylesheet = fileURLToPath(new URL('../../src/assets/css/styles.css', import.meta.url));

export const unicodeRange =
  /unicode-range:([^;]+);/.exec(await readFile(stylesheet, 'utf8'))?.[1]?.replaceAll(/\s/g, '') ??
  '';

if (!unicodeRange) {
  throw new Error(`${stylesheet} declares the font's unicode-range`);
}

export const codePointRanges = unicodeRange.split(',').map((range) => {
  const [from = 0, to = from] = range
    .replace('U+', '')
    .split('-')
    .map((hex) => Number.parseInt(hex, 16));

  return { from, to };
});
