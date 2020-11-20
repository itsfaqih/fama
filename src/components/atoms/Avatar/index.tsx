import React from 'react';
import classNames from 'classnames';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function Avatar({ src, alt, className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width="auto"
      height="auto"
      className={classNames(
        'object-cover border-4 border-indigo-400 rounded-3xl w-28 h-28 md:w-60 md:h-60 shadow-xl',
        className
      )}
    />
  );
}
