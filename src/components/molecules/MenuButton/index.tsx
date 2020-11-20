import { FullRoundButton } from 'components/atoms';
import Icons from 'components/icons';
import React from 'react';

interface Props {
  className?: string;
}

export default function MenuButton({ className }: Props) {
  return (
    <FullRoundButton className={className} label="Menu">
      <Icons.Menu className="w-6 h-6" />
    </FullRoundButton>
  );
}
