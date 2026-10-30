import React from 'react';
import { Logo } from 'components/atoms';
import { HighlightedTextIcon } from 'components/molecules';
import { AboutSectionContentProps } from 'components/organisms/About/types';

const Text = () => (
  <>
    I’m a <span className="font-bold text-gray-800">full-stack engineer</span> with more than five
    years on web products, mostly built with
    <HighlightedTextIcon
      as="a"
      href="https://www.typescriptlang.org"
      className="mx-2"
      icon={<Logo name="typescript" />}
    >
      TypeScript
    </HighlightedTextIcon>{' '}
    and{' '}
    <HighlightedTextIcon
      as="a"
      href="https://react.dev"
      className="mx-2"
      icon={<Logo name="react" />}
    >
      React
    </HighlightedTextIcon>
    . Right now I’m building healthcare software at EvidenceCare. Before that I worked at Vestis
    Labs and Jatis Mobile.
  </>
);

const about: AboutSectionContentProps = {
  text: <Text />,
};

export default about;
