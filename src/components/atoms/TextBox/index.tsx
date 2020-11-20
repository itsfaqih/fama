import React from 'react';
import classNames from 'classnames';
import TextBoxProps from 'components/atoms/TextBox/types';

export default function TextBox({ placeholder, className, value, onChange }: TextBoxProps) {
  return (
    <input
      type="text"
      className={classNames('py-2.5 placeholder-gray-500 bg-transparent', className)}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
