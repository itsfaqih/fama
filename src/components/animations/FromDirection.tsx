import React from 'react';
import { cn } from 'cn';

const offsets = {
  left: ['-100%', '0'],
  top: ['0', '-100%'],
  right: ['100%', '0'],
  bottom: ['0', '100%'],
} as const;

interface Props {
  children: React.ReactNode;
  from: keyof typeof offsets;
  custom?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FromDirection({
  children,
  from,
  custom = 1,
  delay = 0,
  duration = 0.6,
  className,
}: Props) {
  const [x, y] = offsets[from];

  return (
    <div
      className={cn('from-clip', className)}
      style={{ '--delay': `${custom * delay}s`, '--duration': `${duration}s` }}
    >
      <div className="from" style={{ '--from-x': x, '--from-y': y }}>
        {children}
      </div>
    </div>
  );
}
