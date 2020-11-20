import { TextButton } from 'components/atoms';
import React, { ReactElement } from 'react';

interface Props {
  text: string;
  icon: ReactElement;
  className?: string;
}

export default function TextIconButton({ text, icon, className }: Props) {
  const Icon = React.cloneElement(icon, { className: 'w-4 h-4' });
  return (
    <TextButton className={className}>
      <span className="pr-2">{text}</span>
      {Icon}
    </TextButton>
  );
}
