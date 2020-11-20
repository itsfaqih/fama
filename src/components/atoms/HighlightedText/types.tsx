import { ReactNode } from "react";

export default interface HighlightedTextProps {
  children: ReactNode;
  as?: 'a' | 'span';
  href?: string;
  className?: string;
}