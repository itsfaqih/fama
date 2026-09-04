export default interface TextSelectProps {
  options: TextSelectOptionProps[];
  state: [TextSelectOptionProps, (option: TextSelectOptionProps) => void];
  className?: string;
}

export interface TextSelectOptionProps {
  value: string | number;
  label: string;
}
