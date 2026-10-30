import { capture } from 'component-tests/capture';
import Contact from 'components/organisms/Contact';
import { expect, test } from 'vite-plus/test';
import { page } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

test('Contact: the email and each social profile are links', async () => {
  await render(
    <Contact
      title="Get in touch"
      content={{
        email: 'hello@example.com',
        socials: {
          facebook: 'https://facebook.com/example',
          twitter: 'https://twitter.com/example',
          instagram: 'https://instagram.com/example',
        },
      }}
    />,
  );

  await expect
    .element(page.getByRole('link', { name: 'hello@example.com' }))
    .toHaveAttribute('href', 'mailto:hello@example.com');
  await expect
    .element(page.getByRole('link', { name: 'Facebook' }))
    .toHaveAttribute('href', 'https://facebook.com/example');
  await expect
    .element(page.getByRole('link', { name: 'Twitter' }))
    .toHaveAttribute('href', 'https://twitter.com/example');
  await expect
    .element(page.getByRole('link', { name: 'Instagram' }))
    .toHaveAttribute('href', 'https://instagram.com/example');
  await capture('Contact', 'default');
});
