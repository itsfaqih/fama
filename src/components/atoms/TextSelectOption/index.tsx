import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  active: boolean;
  selected: boolean;
  onClick: (any: any) => any;
}

export default function TextSelectOption({ children, active, selected, onClick }: Props) {
  return (
    <li
      className={classNames('py-2 px-4 w-32 flex items-center cursor-pointer hover:bg-indigo-100', {
        'bg-indigo-100': active,
      })}
      onClick={onClick}
    >
      {children}
      {selected && (
        <svg
          className="absolute w-4 h-4 text-indigo-500 right-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </li>
  );
}
