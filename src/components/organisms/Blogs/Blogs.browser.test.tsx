import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import Blogs from 'components/organisms/Blogs';
import { expect, test } from 'vite-plus/test';
import { page } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const items = [
  {
    title: 'Apa itu JWT (JSON Web Token)?',
    date: new Date('2020-11-14'),
    url: 'https://medium.com/@itsfaqih/apa-itu-jwt-json-web-token-63407936da10',
  },
];

test('Blogs: each post links to its article with an English date', async () => {
  await render(<Blogs title="Blogs" content={{ items }} />);

  await expect
    .element(page.getByRole('link', { name: 'Apa itu JWT (JSON Web Token)?' }))
    .toHaveAttribute(
      'href',
      'https://medium.com/@itsfaqih/apa-itu-jwt-json-web-token-63407936da10',
    );
  await expect.element(page.getByText('November 14, 2020')).toBeVisible();
  await expect
    .element(page.getByRole('link', { name: 'More article' }))
    .toHaveAttribute('href', 'https://medium.com/@itsfaqih');
  await capture('Blogs', 'default');
});

test('Blogs: in Indonesian dates and the more link are in Indonesian', async () => {
  await render(inIndonesian(<Blogs title="Blog" content={{ items }} />));

  await expect.element(page.getByText('14 November 2020')).toBeVisible();
  await expect.element(page.getByRole('link', { name: 'Artikel lainnya' })).toBeVisible();
});
