import React, { ReactNode } from 'react';
import { cn } from 'cn';

interface Props {
  children: ReactNode;
}

export default function MenuItem({ children }: Props) {
  return (
    <span className="relative">
      {children}
      <svg
        className={cn(
          '-left-1 bottom-0.5 -z-10 absolute h-3.5 w-0 text-indigo-800 transition-all',
          'menu-item-highlight',
        )}
        fill="currentColor"
      >
        <rect width="100%" height="100%" rx={6} ry={6}></rect>
      </svg>
    </span>
  );
}
