import { FullRoundButton } from 'components/atoms';
import React from 'react';

interface Props {
  className?: string;
}

export default function MenuButton({ className }: Props) {
  return (
    <FullRoundButton className={className}>
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </FullRoundButton>
  );
}
