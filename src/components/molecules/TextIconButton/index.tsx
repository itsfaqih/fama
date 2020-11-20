import { TextButton } from 'components/atoms';
import React, { ReactElement } from 'react';
import classNames from 'classnames';

interface Props {
  text: string;
  icon: ReactElement;
  className?: string;
}

export default function TextIconButton({ text, icon, className }: Props) {
  const Icon = React.cloneElement(icon, { className: classNames('w-4 h-4', icon.props.className) });
  return (
    <TextButton className={className}>
      <span className="pr-2">{text}</span>
      {Icon}
    </TextButton>
  );
}
