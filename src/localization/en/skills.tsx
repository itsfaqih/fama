import React from 'react';
import { Logo } from 'components/atoms';
import { HighlightedTextIcon } from 'components/molecules';

const Text = () => (
  <>
    I’ve spent about two years on improving my skills in{' '}
    <span className="font-bold text-gray-800">website development</span> using{' '}
    <HighlightedTextIcon as="a" href="https://php.net" className="mx-2" icon={<Logo name="php" />}>
      PHP
    </HighlightedTextIcon>{' '}
    and{' '}
    <HighlightedTextIcon className="mx-2" icon={<Logo name="javascript" />}>
      Javascript
    </HighlightedTextIcon>{' '}
    that I’m now pretty confident in building apps using these tools:
  </>
);

const skills = {
  text: <Text />,
};

export default skills;
