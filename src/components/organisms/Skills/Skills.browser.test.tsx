import { capture } from 'component-tests/capture';
import Skills from 'components/organisms/Skills';
import skills from 'data/skills';
import { expect, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

function iconSize(name: string) {
  const { width, height } = page
    .getByRole('link', { name })
    .element()
    .querySelector('img')!
    .getBoundingClientRect();

  return { width: Math.round(width), height: Math.round(height) };
}

test('Skills: each icon links to its technology site', async () => {
  await render(<Skills title="Skills" content={{ text: 'Tools I use', items: skills }} />);

  for (const [name, href] of [
    ['TypeScript', 'https://www.typescriptlang.org'],
    ['React', 'https://react.dev'],
    ['Next.js', 'https://nextjs.org'],
    ['Tailwind CSS', 'https://tailwindcss.com'],
    ['Node.js', 'https://nodejs.org'],
    ['PostgreSQL', 'https://www.postgresql.org'],
    ['Laravel', 'https://laravel.com'],
    ['Figma', 'https://www.figma.com'],
  ] as const) {
    await expect.element(page.getByRole('link', { name })).toHaveAttribute('href', href);
  }

  await capture('Skills', 'default');
});

test('Skills: the Next.js and Figma icons keep their original proportions', async () => {
  await render(<Skills title="Skills" content={{ text: 'Tools I use', items: skills }} />);
  await expect.element(page.getByRole('link', { name: 'Next.js' })).toBeVisible();

  expect(iconSize('Next.js')).toEqual({ width: 80, height: 48 });
  expect(iconSize('Figma')).toEqual({ width: 32, height: 48 });
});

test('Skills: keyboard focus on an icon shows it in colour', async () => {
  await render(<Skills title="Skills" content={{ text: 'Tools I use', items: skills }} />);
  const wrapper = page.getByRole('link', { name: 'TypeScript' }).element().parentElement!;

  expect(getComputedStyle(wrapper).filter).toBe('grayscale(1)');
  await userEvent.tab();

  await expect.element(page.getByRole('link', { name: 'TypeScript' })).toHaveFocus();
  expect(getComputedStyle(wrapper).filter).toBe('none');
  await capture('Skills', 'typescript-focused');
});
