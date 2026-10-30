export default interface TextSelectProps {
  options: TextSelectOptionProps[];
  state: [TextSelectOptionProps, (option: TextSelectOptionProps) => void];
  className?: string | undefined;
}

export interface TextSelectOptionProps {
  value: string | number;
  label: string;
}
