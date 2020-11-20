import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Icons from 'components/icons';

interface Props {
  children: ReactNode;
  active: boolean;
  selected: boolean;
  onClick: (any: any) => any;
}

export default function TextSelectOption({ children, active, selected, onClick }: Props) {
  return (
    <li
      className={classNames('py-2 px-4 w-32 flex items-center cursor-pointer hover:bg-indigo-50', {
        'bg-indigo-50': active,
      })}
      onClick={onClick}
    >
      {children}
      {selected && <Icons.CheckRounded className="absolute w-4 h-4 text-indigo-500 right-4" />}
    </li>
  );
}
