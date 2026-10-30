import React from 'react';
import { Logo } from 'components/atoms';
import { HighlightedTextIcon } from 'components/molecules';
import { AboutSectionContentProps } from 'components/organisms/About/types';

const Text = () => (
  <>
    I’m currently working as a freelance{' '}
    <span className="font-bold text-gray-800">fullstack developer</span> and{' '}
    <span className="font-bold text-gray-800">UI/UX designer</span>. I enjoy building web apps using
    <HighlightedTextIcon
      as="a"
      href="https://tailwindcss.com"
      className="mx-2"
      icon={<Logo name="tailwindcss" />}
    >
      TailwindCSS
    </HighlightedTextIcon>{' '}
    and{' '}
    <HighlightedTextIcon
      as="a"
      href="https://reactjs.org"
      className="mx-2"
      icon={<Logo name="react" />}
    >
      React
    </HighlightedTextIcon>
    . I'm also an active student in University of AMIKOM Yogyakarta.
  </>
);

const about: AboutSectionContentProps = {
  text: <Text />,
};

export default about;
