import { FullRoundButton } from 'components/atoms';
import FullRoundButtonProps from 'components/atoms/FullRoundButton/types';
import Icons from 'components/icons';
import React from 'react';

interface Props extends FullRoundButtonProps {
  isOpen?: boolean;
}

export default function MenuButton({ isOpen = false, onClick, ...props }: Props) {
  return (
    <FullRoundButton active={isOpen} {...props} label="Menu" onClick={onClick}>
      {isOpen ? <Icons.Close className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
    </FullRoundButton>
  );
}
