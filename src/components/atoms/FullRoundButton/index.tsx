import React from 'react';
import { cn } from 'cn';
import FullRoundButtonProps from 'components/atoms/FullRoundButton/types';

export default function FullRoundButton({
  children,
  label,
  href,
  className,
}: FullRoundButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'press flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:ring-2 ring-indigo-500 focus:ring-offset-2 bg-indigo-500 hover:bg-indigo-600 text-white',
        className,
      )}
      style={{ '--press-scale': 0.9 }}
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}
