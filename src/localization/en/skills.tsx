import React from 'react';
import { Icon } from '@iconify/react';
import phpIcon from '@iconify/icons-logos/php';
import javascriptIcon from '@iconify/icons-logos/javascript';
import { HighlightedTextIcon } from 'components/molecules';
import normalizeIconifyIcon from 'utils/normalize-iconify';

const phpIconData = normalizeIconifyIcon(phpIcon);
const javascriptIconData = normalizeIconifyIcon(javascriptIcon);

const Text = () => (
  <>
    I’ve spent about two years on improving my skills in{' '}
    <span className="font-bold text-gray-800">website development</span> using{' '}
    <HighlightedTextIcon
      as="a"
      href="https://php.net"
      className="mx-2"
      icon={<Icon icon={phpIconData} ssr />}
    >
      PHP
    </HighlightedTextIcon>{' '}
    and{' '}
    <HighlightedTextIcon className="mx-2" icon={<Icon icon={javascriptIconData} ssr />}>
      Javascript
    </HighlightedTextIcon>{' '}
    that I’m now pretty confident in building apps using these tools:
  </>
);

const skills = {
  text: <Text />,
};

export default skills;
