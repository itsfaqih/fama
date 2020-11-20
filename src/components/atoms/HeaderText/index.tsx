import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
  tag?: 'div' | 'h2';
}

export default function HeaderText({ children, className, tag = 'div' }: Props) {
  if (tag === 'div') {
    return (
      <div className={classNames('text-3xl font-bold leading-normal text-gray-800', className)}>
        {children}
      </div>
    );
  }
  return (
    <h2 className={classNames('text-3xl font-bold leading-normal text-gray-800', className)}>
      {children}
    </h2>
  );
}
