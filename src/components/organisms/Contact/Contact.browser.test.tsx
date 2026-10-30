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
          github: 'https://github.com/example',
          linkedin: 'https://www.linkedin.com/in/example',
          dribbble: 'https://dribbble.com/example',
        },
      }}
    />,
  );

  await expect
    .element(page.getByRole('link', { name: 'hello@example.com' }))
    .toHaveAttribute('href', 'mailto:hello@example.com');
  await expect
    .element(page.getByRole('link', { name: 'GitHub' }))
    .toHaveAttribute('href', 'https://github.com/example');
  await expect
    .element(page.getByRole('link', { name: 'LinkedIn' }))
    .toHaveAttribute('href', 'https://www.linkedin.com/in/example');
  await expect
    .element(page.getByRole('link', { name: 'Dribbble' }))
    .toHaveAttribute('href', 'https://dribbble.com/example');
  await capture('Contact', 'default');
});
