import { HeaderText, TitleLine } from 'components/atoms';
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { SVGMotionProps } from 'framer-motion';

interface Props {
  children: ReactNode;
  variant?: SectionVariants;
  lineProps?: SVGMotionProps<SVGElement>;
}

export enum SectionVariants {
  LEFT = 'left',
  CENTER = 'center',
}

export default function SectionTitle({
  children,
  variant = SectionVariants.LEFT,
  lineProps,
}: Props) {
  return (
    <HeaderText
      className={classNames('flex flex-col items-center', {
        'lg:flex-row': variant === SectionVariants.LEFT,
      })}
    >
      {children}
      <TitleLine
        className={classNames({
          'lg:ml-6 lg:mt-0': variant === SectionVariants.LEFT,
        })}
        {...lineProps}
      />
    </HeaderText>
  );
}
