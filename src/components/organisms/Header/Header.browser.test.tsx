import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import Header from 'components/organisms/Header';
import React, { useRef } from 'react';
import { expect, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const data = {
  name: 'Faqih Muntashir',
  profilePicture: '/img/person.jpg',
  job: 'Fullstack Developer',
};

const text = { headerText: { greetings: 'Hello', intro: "I'm", preTitle: 'a' } };

function HeaderAbovePage() {
  const lowerSectionRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Header data={data} text={text} lowerSectionRef={lowerSectionRef} />
      <div style={{ height: 2000 }} />
      <section ref={lowerSectionRef} aria-label="About">
        About
      </section>
    </>
  );
}

test('Header: Scroll down brings the next section into view', async () => {
  await render(<HeaderAbovePage />);
  await expect.element(page.getByRole('region', { name: 'About' })).not.toBeInViewport();

  await userEvent.click(page.getByRole('button', { name: 'Scroll down' }));

  await expect.element(page.getByRole('region', { name: 'About' })).toBeInViewport();
  await capture('Header', 'scrolled');
});

test('Header: in Indonesian the scroll button reads Scroll ke bawah', async () => {
  await render(inIndonesian(<HeaderAbovePage />));

  await expect.element(page.getByRole('button', { name: 'Scroll ke bawah' })).toBeVisible();
  await capture('Header', 'indonesian');
});
