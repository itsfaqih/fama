import React from 'react';
import { cn } from 'cn';

const coverOffsets = {
  right: ['-100%', '0'],
  left: ['100%', '0'],
} as const;

interface Props {
  children: React.ReactNode;
  from: keyof typeof coverOffsets;
  custom?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function Reveal({
  children,
  from,
  custom = 1,
  delay = 0.6,
  duration = 0.45,
  className,
}: Props) {
  const [x, y] = coverOffsets[from];

  return (
    <div className={cn('overflow-hidden relative', className)}>
      {children}
      <div
        className="reveal-cover absolute top-0 left-0 w-full h-full bg-indigo-500"
        style={{
          '--to-x': x,
          '--to-y': y,
          '--delay': `${custom * delay}s`,
          '--duration': `${duration}s`,
          '--ease': 'var(--motion-ease-out)',
        }}
      />
    </div>
  );
}
