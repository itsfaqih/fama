import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import About from 'components/organisms/About';
import { expect, test } from 'vite-plus/test';
import { page } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

test('About: shows the text and a resume download link', async () => {
  await render(
    <About
      title="About me"
      content={{ text: 'I build web apps.', resumeUrl: 'https://example.com/resume.pdf' }}
    />,
  );

  await expect.element(page.getByText('I build web apps.')).toBeVisible();
  await expect
    .element(page.getByRole('link', { name: 'Download Resume' }))
    .toHaveAttribute('href', 'https://example.com/resume.pdf');
  await capture('About', 'default');
});

test('About: in Indonesian the resume link reads Unduh Resume', async () => {
  await render(
    inIndonesian(
      <About
        title="Tentang saya"
        content={{
          text: 'Saya membuat aplikasi web.',
          resumeUrl: 'https://example.com/resume.pdf',
        }}
      />,
    ),
  );

  await expect.element(page.getByRole('link', { name: 'Unduh Resume' })).toBeVisible();
});

test('About: without a resume URL there is no resume link', async () => {
  await render(<About title="About me" content={{ text: 'I build web apps.' }} />);

  await expect.element(page.getByText('I build web apps.')).toBeVisible();
  await expect.element(page.getByRole('link', { name: 'Download Resume' })).not.toBeInTheDocument();
});
