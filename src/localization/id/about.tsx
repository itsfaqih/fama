import React from 'react';
import { Logo } from 'components/atoms';
import { HighlightedTextIcon } from 'components/molecules';
import { AboutSectionContentProps } from 'components/organisms/About/types';

const Text = () => (
  <>
    Saya <span className="font-bold text-gray-800">full-stack engineer</span> dengan pengalaman
    lebih dari lima tahun menggarap produk web, kebanyakan dengan
    <HighlightedTextIcon
      as="a"
      href="https://www.typescriptlang.org"
      className="mx-2"
      icon={<Logo name="typescript" />}
    >
      TypeScript
    </HighlightedTextIcon>{' '}
    dan{' '}
    <HighlightedTextIcon
      as="a"
      href="https://react.dev"
      className="mx-2"
      icon={<Logo name="react-alt" />}
    >
      React
    </HighlightedTextIcon>
    . Sekarang saya membangun perangkat lunak kesehatan di EvidenceCare. Sebelumnya saya bekerja di
    Vestis Labs dan Jatis Mobile.
  </>
);

const about: AboutSectionContentProps = {
  text: <Text />,
};

export default about;
