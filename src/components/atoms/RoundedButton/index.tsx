import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  as?: 'button' | 'a';
  href?: string;
  className?: string;
}

export default function RoundedButton({ children, as = 'button', href = '', className }: Props) {
  const classes = classNames(
    'flex items-center justify-center h-12 px-12 shadow-lg text-sm text-white hover:bg-indigo-600 bg-indigo-500 font-bold rounded-full transition-all hover:shadow-none transform hover:translate-y-1',
    className
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
