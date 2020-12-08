import React from 'react';
import classNames from 'classnames';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { RefObject } from 'react';

interface Props {
  contentRef: RefObject<HTMLElement | Element>;
  classOnOpen: string;
  classOnClose: string;
  open?: boolean;
  animationFinish?: boolean;
  useAnimationFinish?: boolean;
  className?: string;
}

export default function Overlay({
  contentRef,
  classOnOpen,
  classOnClose,
  open = false,
  animationFinish = false,
  className,
}: Props) {
  if (open) {
    if (contentRef.current) disableBodyScroll(contentRef.current as HTMLElement);
  } else clearAllBodyScrollLocks();
  
  return (
    <svg
      className={classNames(
        'h-full top-0 right-0 transition-all duration-1000 z-10',
        {
          [classOnClose]: !open,
          [classOnOpen]: open,
          fixed: animationFinish,
          hidden: !animationFinish,
        },
        className
      )}
      fill="currentColor"
    >
      <rect width="100%" height="100%" />
    </svg>
  );
}
