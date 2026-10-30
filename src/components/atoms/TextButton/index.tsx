import React from 'react';
import { cn } from 'cn';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href: string;
  className?: string | undefined;
}

export default function TextButton({ children, href, className }: Props) {
  return (
    <a
      href={href}
      data-smooth-scroll
      className={cn(
        'inline-flex items-center text-gray-600 focus:outline-none focus:ring-2 ring-indigo-500 rounded-lg ring-offset-2',
        className,
      )}
    >
      {children}
    </a>
  );
}
