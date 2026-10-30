import React, { ReactNode } from 'react';
import { cn } from 'cn';

interface Props {
  children: ReactNode;
  as?: 'button' | 'a';
  href?: string;
  className?: string;
}

export default function RoundedButton({ children, as = 'button', href = '', className }: Props) {
  const classes = cn(
    'lift flex items-center justify-center h-12 px-12 shadow-lg hover:shadow-none text-sm text-white hover:bg-indigo-600 bg-indigo-500 font-bold rounded-full focus:outline-none focus:ring-2 ring-indigo-500 focus:ring-offset-2',
    className,
  );

  if (as === 'button') {
    return <button className={classes}>{children}</button>;
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
