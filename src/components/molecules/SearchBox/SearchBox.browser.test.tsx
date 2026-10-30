import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import SearchBox from 'components/molecules/SearchBox';
import { expect, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

test('Search box: typed text appears in the field', async () => {
  await render(<SearchBox />);

  await userEvent.type(page.getByPlaceholder('Search...'), 'react');

  await expect.element(page.getByPlaceholder('Search...')).toHaveValue('react');
  await capture('SearchBox', 'typed');
});

test('Search box: in Indonesian the placeholder reads Cari sesuatu...', async () => {
  await render(inIndonesian(<SearchBox />));

  await expect.element(page.getByPlaceholder('Cari sesuatu...')).toBeVisible();
});
