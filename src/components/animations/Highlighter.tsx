import React from 'react';
import { cn } from 'cn';

interface Props {
  className?: string;
  rad: number;
  custom?: number;
  delay?: number;
}

export default function Highlighter({ className, rad, custom = 1, delay = 0 }: Props) {
  return (
    <svg
      className={cn('draw absolute w-full-2 text-indigo-200 -z-10 -left-1', className)}
      fill="currentColor"
      style={{
        '--delay': `${custom * delay}s`,
        '--duration': '0.7s',
        '--ease': 'var(--motion-ease-out)',
        '--radius': `${rad}px`,
      }}
    >
      <rect width="100%" height="100%" rx={rad} ry={rad} />
    </svg>
  );
}
