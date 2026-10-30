import { ChangeEventHandler } from 'react';

export default interface TextBoxProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
