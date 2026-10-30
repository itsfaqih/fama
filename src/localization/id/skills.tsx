import React from 'react';
import { Logo } from 'components/atoms';
import { HighlightedTextIcon } from 'components/molecules';

const Text = () => (
  <>
    Saya paling banyak menulis kode dengan
    <HighlightedTextIcon
      as="a"
      href="https://www.typescriptlang.org"
      className="mx-2"
      icon={<Logo name="typescript" />}
    >
      TypeScript
    </HighlightedTextIcon>{' '}
    dan{' '}
    <HighlightedTextIcon as="a" href="https://php.net" className="mx-2" icon={<Logo name="php" />}>
      PHP
    </HighlightedTextIcon>
    , untuk antarmuka, server, sampai basis data. Ini alat yang saya pakai:
  </>
);

const skills = {
  text: <Text />,
};

export default skills;
