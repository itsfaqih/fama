import React from 'react';
import { cn } from 'cn';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: (params: any) => any;
}

export default function TextButton({ children, className, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center text-gray-600 focus:outline-none focus:ring-2 ring-indigo-500 rounded-lg ring-offset-2',
        className
      )}
    >
      {children}
    </button>
  );
}
