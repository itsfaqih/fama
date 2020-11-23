import React from 'react';
import { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  active: boolean;
}

export default function MenuItem({ children, active }: Props) {
  return (
    <span className="relative">
      {children}
      <svg
        className={classNames(
          '-left-1 bottom-0.5 -z-10 absolute w-0 h-3.5 text-indigo-800 transition-all',
          { 'w-full-2': active }
        )}
        fill="currentColor"
      >
        <rect width="100%" height="100%" rx={6} ry={6}></rect>
      </svg>
    </span>
  );
}
