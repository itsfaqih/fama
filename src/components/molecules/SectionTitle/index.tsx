import { HeaderText } from 'components/atoms';
import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  variant?: SectionVariants;
}

export enum SectionVariants {
  LEFT = 'left',
  CENTER = 'center',
}

export default function SectionTitle({ children, variant = SectionVariants.LEFT }: Props) {
  return (
    <HeaderText
      className={classNames('flex flex-col items-center', {
        'lg:flex-row': variant === SectionVariants.LEFT,
      })}
    >
      {children}
      <svg
        className={classNames('w-20 h-1 text-indigo-600 mt-3', {
          'lg:ml-6 lg:mt-0': variant === SectionVariants.LEFT,
        })}
        fill="currentColor"
      >
        <rect width="100%" height="100%" />
      </svg>
    </HeaderText>
  );
}
