import { HeaderText, TitleLine } from 'components/atoms';
import React, { ReactNode } from 'react';
import { cn } from 'cn';

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
      className={cn('flex flex-col items-center', {
        'lg:flex-row': variant === SectionVariants.LEFT,
      })}
    >
      {children}
      <TitleLine
        className={cn({
          'lg:ml-6 lg:mt-0': variant === SectionVariants.LEFT,
        })}
      />
    </HeaderText>
  );
}
