import { readFile } from 'node:fs/promises';
import { expect, test } from 'vite-plus/test';
import { logos } from './index.tsx';

test.each(Object.entries(logos))('%s matches the viewBox of its file', async (name, size) => {
  const svg = await readFile(
    new URL(`../../../../public/icons/${name}.svg`, import.meta.url),
    'utf8',
  );

  expect(/<svg[^>]* viewBox="0 0 (\d+) (\d+)"/.exec(svg)?.slice(1).map(Number)).toEqual(size);
});
