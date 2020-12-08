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
      className={classNames('py-4 px-8 sm:py-2 sm:px-4 w-60 sm:w-32 flex items-center cursor-pointer hover:bg-indigo-50', {
        'bg-indigo-50': active,
      })}
      onClick={onClick}
    >
      {children}
      {selected && <Icons.CheckRounded className="absolute text-indigo-500 w-7 h-7 sm:w-4 sm:h-4 right-4" />}
    </li>
  );
}
