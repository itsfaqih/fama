import { capture } from 'component-tests/capture';
import Notice from 'components/organisms/Notice';
import React from 'react';
import { expect, test } from 'vite-plus/test';
import { page } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

test('Notice: shows its text with the link inside it', async () => {
  await render(
    <Notice
      text={
        <>
          This site moved to <a href="https://example.com">example.com</a>.
        </>
      }
    />,
  );

  await expect
    .element(page.getByRole('paragraph'))
    .toHaveTextContent('This site moved to example.com.');
  await expect
    .element(page.getByRole('link', { name: 'example.com' }))
    .toHaveAttribute('href', 'https://example.com');
  await capture('Notice', 'default');
});
