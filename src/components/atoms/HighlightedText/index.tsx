import React from 'react';
import classNames from 'classnames';
import HighlightedTextProps from 'components/atoms/HighlightedText/types';

export default function HighlightedText({
  children,
  as = 'span',
  href,
  className,
}: HighlightedTextProps) {
  if (as === 'span') {
    return (
      <span className={classNames('px-3 bg-white rounded-full shadow-md', className)}>
        {children}
      </span>
    );
  }
  return (
    <a href={href} className={classNames('px-3 bg-white rounded-full shadow-md', className)}>
      {children}
    </a>
  );
}
