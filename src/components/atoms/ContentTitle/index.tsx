import React, { ReactNode } from 'react';
import { cn } from 'cn';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ContentTitle({ children, className }: Props) {
  return <h3 className={cn('text-lg font-bold text-gray-800', className)}>{children}</h3>;
}
