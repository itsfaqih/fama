import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface Props extends HTMLAttributes<SVGElement> {
  rad: number;
}

export default function Highlighter({ className, rad, ...props }: Props) {
  return (
    <svg
      className={classNames('absolute w-full-2 text-indigo-200 -z-10 -left-1', className)}
      fill="currentColor"
    >
      <rect width="100%" height="100%" rx={rad} ry={rad} {...props} />
    </svg>
  );
}
