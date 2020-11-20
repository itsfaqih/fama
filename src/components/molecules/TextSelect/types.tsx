export default interface TextSelectProps {
  options: TextSelectOptionProps[];
  state: [TextSelectOptionProps, (any: any) => void];
  className?: string;
}

export interface TextSelectOptionProps {
  value: string | number;
  label: string;
}
