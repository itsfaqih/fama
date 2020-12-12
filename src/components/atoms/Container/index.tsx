import React from 'react';
import classNames from 'classnames';
interface Props {
  children?: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export default function Container({ children, className, fluid }: Props) {
  return (
    <div
      className={classNames(
        {
          'max-w-md px-6 mx-auto sm:px-0 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl': !fluid,
          'px-3 sm:px-6': fluid,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
