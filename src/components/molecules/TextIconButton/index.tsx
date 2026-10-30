import { TextButton } from 'components/atoms';
import React, { ReactElement } from 'react';
import { cn } from 'cn';

interface Props {
  text: string;
  icon: ReactElement<{ className?: string }>;
  href: string;
  className?: string;
}

export default function TextIconButton({ text, icon, href, className }: Props) {
  const Icon = React.cloneElement(icon, { className: cn('w-4 h-4', icon.props.className) });

  return (
    <TextButton className={className} href={href}>
      <span className="pr-2">{text}</span>
      {Icon}
    </TextButton>
  );
}
