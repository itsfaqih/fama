import React from 'react';
import classNames from 'classnames';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { RefObject } from 'react';

interface Props {
  contentRef: RefObject<HTMLElement | Element>;
  open?: boolean;
  animationFinish?: boolean;
}

export default function Overlay({ contentRef, open = false, animationFinish = false }: Props) {
  if (open) {
    if (contentRef.current) disableBodyScroll(contentRef.current as HTMLElement);
  } else clearAllBodyScrollLocks();

  return (
    <svg
      className={classNames(
        'h-full top-0 right-0 transition-all text-indigo-600 duration-1000 z-10',
        {
          'w-0': !open,
          'w-full': open,
          fixed: animationFinish,
          hidden: !animationFinish,
        }
      )}

      fill="currentColor"
    >
      <rect width="100%" height="100%" />
    </svg>
  );
}
