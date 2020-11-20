import React from 'react';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function TextButton({ children, className }: Props) {
  return (
    <button className={classNames('flex items-center text-gray-600', className)}>{children}</button>
  );
}
