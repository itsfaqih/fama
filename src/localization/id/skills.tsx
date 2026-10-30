import React from 'react';
import { Logo } from 'components/atoms';
import { HighlightedTextIcon } from 'components/molecules';

const Text = () => (
  <>
    Saya sudah berpengalaman selama dua tahun mendalami{' '}
    <span className="font-bold text-gray-800">pengembangan website</span> menggunakan{' '}
    <HighlightedTextIcon as="a" href="https://php.net" className="mx-2" icon={<Logo name="php" />}>
      PHP
    </HighlightedTextIcon>{' '}
    dan{' '}
    <HighlightedTextIcon className="mx-2" icon={<Logo name="javascript" />}>
      Javascript
    </HighlightedTextIcon>{' '}
    hingga saya cukup percaya diri untuk membangun aplikasi menggunakan:
  </>
);

const skills = {
  text: <Text />,
};

export default skills;
