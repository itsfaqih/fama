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

  await expect
    .element(page.getByRole('link', { name: 'React' }))
    .toHaveAttribute('href', 'https://reactjs.org');
  await expect
    .element(page.getByRole('link', { name: 'Tailwind CSS' }))
    .toHaveAttribute('href', 'https://tailwindcss.com');
  await expect
    .element(page.getByRole('link', { name: 'Laravel' }))
    .toHaveAttribute('href', 'https://laravel.com');
  await expect
    .element(page.getByRole('link', { name: 'CodeIgniter' }))
    .toHaveAttribute('href', 'https://codeigniter.com');
  await expect
    .element(page.getByRole('link', { name: 'PostCSS' }))
    .toHaveAttribute('href', 'https://postcss.org');
  await expect
    .element(page.getByRole('link', { name: 'Bootstrap' }))
    .toHaveAttribute('href', 'https://getbootstrap.com');
  await expect
    .element(page.getByRole('link', { name: 'Next.js' }))
    .toHaveAttribute('href', 'https://nextjs.org');
  await capture('Skills', 'default');
});

test('Skills: the CodeIgniter, Next.js and Bootstrap icons keep their original proportions', async () => {
  await render(<Skills title="Skills" content={{ text: 'Tools I use', items: skills }} />);
  await expect.element(page.getByRole('link', { name: 'Next.js' })).toBeVisible();

  expect(iconSize('CodeIgniter')).toEqual({ width: 51, height: 60 });
  expect(iconSize('Next.js')).toEqual({ width: 80, height: 48 });
  expect(iconSize('Bootstrap')).toEqual({ width: 48, height: 48 });
});

test('Skills: keyboard focus on an icon shows it in colour', async () => {
  await render(<Skills title="Skills" content={{ text: 'Tools I use', items: skills }} />);
  const wrapper = page.getByRole('link', { name: 'React' }).element().parentElement!;

  expect(getComputedStyle(wrapper).filter).toBe('grayscale(1)');
  await userEvent.tab();

  await expect.element(page.getByRole('link', { name: 'React' })).toHaveFocus();
  expect(getComputedStyle(wrapper).filter).toBe('none');
  await capture('Skills', 'react-focused');
});
