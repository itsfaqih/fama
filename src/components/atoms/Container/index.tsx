import React from 'react';
import { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div
      className={classNames(
        'max-w-md px-6 mx-auto font-sans sm:px-0 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl',
        className
      )}
    >
      {children}
    </div>
  );
}
