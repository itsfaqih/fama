import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { compile } from 'tailwindcss';
import { expect, test } from 'vite-plus/test';
import { springProperties } from '../../../tools/static-site/springs.ts';

const stylesheet = await readFile(new URL('./styles.css', import.meta.url), 'utf8');

const withoutWhitespace = (css: string) => css.replaceAll(/\s/g, '');

test('the spring easings in the stylesheet are the ones Motion computes', () => {
  const block = /\/\* springs:start \*\/([^]*)\/\* springs:end \*\//.exec(stylesheet)?.[1] ?? '';

  expect(withoutWhitespace(block)).toBe(withoutWhitespace(springProperties()));
});

test('no class the stylesheet defines is also a Tailwind utility', async () => {
  const classes = [
    ...new Set(
      Array.from(
        stylesheet.replaceAll(/'[^']*'|"[^"]*"/g, '').matchAll(/(?<![\w-])\.([a-z][\w-]*)/g),
        ([, name]) => name ?? '',
      ),
    ),
  ];

  const tailwindPath = createRequire(import.meta.url).resolve('tailwindcss/index.css');

  const tailwind = await compile("@import 'tailwindcss';", {
    loadStylesheet: async () => ({
      path: tailwindPath,
      base: '',
      content: await readFile(tailwindPath, 'utf8'),
    }),
  });

  const css = tailwind.build(classes);

  expect(classes).toContain('draw');
  expect(classes.filter((name) => css.includes(`.${name}`))).toEqual([]);
});
