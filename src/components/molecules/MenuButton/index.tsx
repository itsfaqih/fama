import { FullRoundButton } from 'components/atoms';
import FullRoundButtonProps from 'components/atoms/FullRoundButton/types';
import Icons from 'components/icons';
import React from 'react';

interface Props extends FullRoundButtonProps {}

export default function MenuButton({ ...props }: Props) {
  return (
    <FullRoundButton {...props} label="Menu">
      <Icons.Menu className="w-6 h-6" />
    </FullRoundButton>
  );
}
