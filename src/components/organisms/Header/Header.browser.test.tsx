import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import Header from 'components/organisms/Header';
import { expect, test } from 'vite-plus/test';
import { page } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const data = {
  name: 'Faqih Muntashir',
  profilePicture: {
    jpeg: '/img/person.jpg',
    avif: { small: '/img/person-240.avif', large: '/img/person.avif' },
  },
  job: 'Fullstack Developer',
};

const text = { headerText: { greetings: 'Hello', intro: "I'm", preTitle: 'a' } };

test('Header: the 240 px profile picture loads the 240 px AVIF, with the JPEG as the fallback', async () => {
  await render(<Header data={data} text={text} />);
  const picture = page.getByRole('img', { name: 'Profile Picture' });

  await expect.element(picture).toHaveAttribute('src', '/img/person.jpg');
  await expect.poll(() => picture.element()).toHaveProperty('complete', true);
  expect(picture.element()).toHaveProperty(
    'currentSrc',
    expect.stringMatching(/\/img\/person-240\.avif$/),
  );
  expect(picture.element()).toHaveProperty('naturalWidth', 240);
  await capture('Header', 'default');
});

test('Header: in Indonesian the scroll link reads Scroll ke bawah and leads to About me', async () => {
  await render(inIndonesian(<Header data={data} text={text} />));

  await expect
    .element(page.getByRole('link', { name: 'Scroll ke bawah' }))
    .toHaveAttribute('href', '#about');
  await capture('Header', 'indonesian');
});
