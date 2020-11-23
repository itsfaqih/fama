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
  if (open) disableBodyScroll(contentRef.current as HTMLElement);
  else clearAllBodyScrollLocks();

  return (
    <svg
      className={classNames(
        'w-12 h-12 top-8 transform transition-all text-indigo-600 duration-1000 z-10',
        {
          'rounded-full scale-75': !open,
          'scale-999': open,
          'fixed': animationFinish,
          'hidden': !animationFinish
        }
      )}
      fill="currentColor"
    >
      <circle cx="50%" cy="50%" r="100%" />
    </svg>
  );
}
