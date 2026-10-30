import React from 'react';
import { Logo } from 'components/atoms';
import { HighlightedTextIcon } from 'components/molecules';

const Text = () => (
  <>
    I’ve written most of my code in
    <HighlightedTextIcon
      as="a"
      href="https://www.typescriptlang.org"
      className="mx-2"
      icon={<Logo name="typescript" />}
    >
      TypeScript
    </HighlightedTextIcon>{' '}
    and{' '}
    <HighlightedTextIcon as="a" href="https://php.net" className="mx-2" icon={<Logo name="php" />}>
      PHP
    </HighlightedTextIcon>
    , across frontends, backends and databases. These are the tools I build with:
  </>
);

const skills = {
  text: <Text />,
};

export default skills;
