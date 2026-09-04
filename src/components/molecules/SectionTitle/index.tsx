import { HeaderText, TitleLine } from 'components/atoms';
import React, { ReactNode } from 'react';
import { cn } from 'cn';
import { SVGMotionProps } from 'motion/react';

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
      className={cn('flex flex-col items-center', {
        'lg:flex-row': variant === SectionVariants.LEFT,
      })}
    >
      {children}
      <TitleLine
        className={cn({
          'lg:ml-6 lg:mt-0': variant === SectionVariants.LEFT,
        })}
        {...lineProps}
      />
    </HeaderText>
  );
}
