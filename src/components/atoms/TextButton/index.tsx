import React from 'react';
import { cn } from 'cn';
import { MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function TextButton({ children, className, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center text-gray-600 focus:outline-none focus:ring-2 ring-indigo-500 rounded-lg ring-offset-2',
        className,
      )}
    >
      {children}
    </button>
  );
}
