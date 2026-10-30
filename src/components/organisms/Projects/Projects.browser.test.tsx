import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import Projects from 'components/organisms/Projects';
import { expect, test } from 'vite-plus/test';
import { page } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const items = [
  {
    title: 'usePagination',
    description: 'Simple client side pagination hooks for react.',
    type: 'github' as const,
    url: 'https://github.com/example/usepagination',
  },
];

test('Projects: each card links to its project and the section links to GitHub', async () => {
  await render(<Projects title="Projects" content={{ items }} />);

  await expect.element(page.getByRole('heading', { name: 'usePagination' })).toBeVisible();
  await expect
    .element(page.getByRole('link', { name: 'Details' }))
    .toHaveAttribute('href', 'https://github.com/example/usepagination');
  await expect
    .element(page.getByRole('link', { name: 'See more' }))
    .toHaveAttribute('href', 'https://github.com/itsfaqih');
  await capture('Projects', 'default');
});

test('Projects: in Indonesian the links read Lihat and Lihat Selengkapnya', async () => {
  await render(inIndonesian(<Projects title="Proyek" content={{ items }} />));

  await expect.element(page.getByRole('link', { name: 'Lihat', exact: true })).toBeVisible();
  await expect.element(page.getByRole('link', { name: 'Lihat Selengkapnya' })).toBeVisible();
});
