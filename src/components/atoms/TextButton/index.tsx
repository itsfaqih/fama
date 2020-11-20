import React from 'react';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function TextButton({ children, className }: Props) {
  return (
    <button className={classNames('inline-flex items-center text-gray-600 focus:outline-none focus:ring-2 ring-indigo-500 rounded-lg ring-offset-2', className)}>{children}</button>
  );
}
