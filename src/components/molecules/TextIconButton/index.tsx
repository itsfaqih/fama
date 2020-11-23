import { TextButton } from 'components/atoms';
import React, { ReactElement } from 'react';
import classNames from 'classnames';

interface Props {
  text: string;
  icon: ReactElement;
  className?: string;
  onClick: (params: any) => any;
}

export default function TextIconButton({ text, icon, className, onClick }: Props) {
  const Icon = React.cloneElement(icon, { className: classNames('w-4 h-4', icon.props.className) });
  return (
    <TextButton className={className} onClick={onClick}>
      <span className="pr-2">{text}</span>
      {Icon}
    </TextButton>
  );
}
