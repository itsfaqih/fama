import { HighlightedText } from 'components/atoms';
import HighlightedTextProps from 'components/atoms/HighlightedText/types';
import React, { ReactElement } from 'react';
import classNames from 'classnames';

interface Props extends HighlightedTextProps {
  icon: ReactElement;
}

export default function HighlightedTextIcon({ icon, children, className, ...props }: Props) {
  const Icon = React.cloneElement(icon, { className: 'w-7 h-7 pr-2 self-center' });

  return (
    <HighlightedText
      {...props}
      className={classNames(
        'inline-flex items-baseline text-gray-800 font-medium transition-all transform hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      {Icon}
      {children}
    </HighlightedText>
  );
}
