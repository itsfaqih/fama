import React from 'react';
import { Icon } from '@iconify/react';
import phpIcon from '@iconify/icons-logos/php';
import javascriptIcon from '@iconify/icons-logos/javascript';
import { HighlightedTextIcon } from 'components/molecules';

const Text = () => (
  <>
    Saya sudah berpengalaman selama dua tahun mendalami{' '}
    <span className="font-bold text-gray-800">pengembangan website</span> menggunakan{' '}
    <HighlightedTextIcon
      as="a"
      href="https://php.net"
      className="mx-2"
      icon={<Icon icon={phpIcon} style={{ fontSize: '24px' }} />}
    >
      PHP
    </HighlightedTextIcon>{' '}
    dan{' '}
    <HighlightedTextIcon
      className="mx-2"
      icon={<Icon icon={javascriptIcon} style={{ fontSize: '24px' }} />}
    >
      Javascript
    </HighlightedTextIcon>{' '}
    hingga saya cukup percaya diri untuk membangun aplikasi menggunakan:
  </>
);

const skills = {
  text: <Text />,
};

export default skills;
