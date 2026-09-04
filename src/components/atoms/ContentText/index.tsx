import React, { ReactNode } from 'react';
import { cn } from 'cn';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ContentText({ children, className }: Props) {
  return (
    <p className={cn('text-center text-gray-700 leading-extra-loose', className)}>
      {children}
    </p>
  );
}
