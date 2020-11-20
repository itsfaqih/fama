import { TextBox } from 'components/atoms';
import TextBoxProps from 'components/atoms/TextBox/types';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { LanguageContext } from 'contexts';

export default function SearchBox({ className }: TextBoxProps) {
  const language = useContext(LanguageContext);

  return (
    <div
      className={classNames('focus-within:ring-2 ring-indigo-500 focus-within:shadow-xl focus-within:bg-white transition-all transform focus-within:scale-110 flex items-center overflow-hidden bg-gray-200 rounded-xl', className)}
    >
      <svg
        className="w-4 h-4 mx-4 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <TextBox
        className="flex-1 focus:outline-none"
        placeholder={language.value === 'en' ? 'Search...' : 'Cari sesuatu...'}
      />
    </div>
  );
}
