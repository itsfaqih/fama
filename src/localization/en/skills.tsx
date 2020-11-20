import React from 'react';
import { Icon } from '@iconify/react';
import phpIcon from '@iconify/icons-logos/php';
import javascriptIcon from '@iconify/icons-logos/javascript';
import { HighlightedTextIcon } from 'components/molecules';

const Text = () => (
  <>
    I’ve spent about two years on improving my skills in{' '}
    <span className="font-bold text-gray-800">website development</span> using{' '}
    <HighlightedTextIcon
      as="a"
      href="https://php.net"
      className="mx-2"
      icon={<Icon icon={phpIcon} />}
    >
      PHP
    </HighlightedTextIcon>{' '}
    and{' '}
    <HighlightedTextIcon className="mx-2" icon={<Icon icon={javascriptIcon} />}>
      Javascript
    </HighlightedTextIcon>{' '}
    that I’m now pretty confident in building apps using these tools:
  </>
);

const skills = {
  text: <Text />,
};

export default skills;
