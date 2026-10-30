import React from 'react';
import { Logo } from 'components/atoms';
import { HighlightedTextIcon } from 'components/molecules';
import { AboutSectionContentProps } from 'components/organisms/About/types';

const Text = () => (
  <>
    Saat ini saya sedang bekerja sebagai freelance{' '}
    <span className="font-bold text-gray-800">fullstack developer</span> dan{' '}
    <span className="font-bold text-gray-800">UI/UX designer</span>, saya sangat suka menggunakan
    <HighlightedTextIcon
      as="a"
      href="https://tailwindcss.com"
      className="mx-2"
      icon={<Logo name="tailwindcss-alt" />}
    >
      TailwindCSS
    </HighlightedTextIcon>{' '}
    dan{' '}
    <HighlightedTextIcon
      as="a"
      href="https://reactjs.org"
      className="mx-2"
      icon={<Logo name="react-alt" />}
    >
      React
    </HighlightedTextIcon>
    . Saya juga seorang mahasiswa di Universitas AMIKOM Yogyakarta.
  </>
);

const about: AboutSectionContentProps = {
  text: <Text />,
};

export default about;
