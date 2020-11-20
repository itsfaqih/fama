import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  as?: 'button' | 'a';
  href?: string;
  className?: string;
}

export default function FullRoundButton({ children, as = 'button', href = '', className }: Props) {
  const classes = classNames(
    'flex items-center justify-center w-12 h-12 text-white bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg transition-all hover:shadow-none transform hover:translate-y-1',
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
