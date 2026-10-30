import React from 'react';
import { cn } from 'cn';

interface Props {
  className?: string;
}

export default function TitleLine({ className }: Props) {
  return (
    <svg
      className={cn('draw w-20 h-1 text-indigo-600 mt-3', className)}
      fill="currentColor"
      style={{ '--delay': '1s', '--duration': '0.3s', '--ease': 'var(--motion-keyframes-ease)' }}
    >
      <rect width="100%" height="100%" />
    </svg>
  );
}
