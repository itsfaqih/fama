import React, { useState } from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import classNames from 'classnames';
import { useRef } from 'react';

interface Props extends HTMLMotionProps<'div'> {
  from:
    | 'left'
    | 'top'
    | 'right'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  delay?: number;
  duration?: number;
  innerClassName?: string;
}

export default function FromDirection({
  children,
  from,
  delay = 0,
  duration = 0.6,
  className,
  innerClassName,
  onAnimationComplete,
  ...props
}: Props) {
  const [overflow, setOverflow] = useState<string | null>('overflow-hidden');
  const variants: Variants = {
    show: (i: number = 1) => ({
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        delay: i * delay,
      },
    }),
    hidden: {
      ...(from.includes('top') && { y: '-100%' }),
      ...(from.includes('bottom') && { y: '100%' }),
      ...(from.includes('left') && { x: '-100%' }),
      ...(from.includes('right') && { x: '100%' }),
    },
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={classNames(overflow, className)}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        onAnimationComplete={() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
          setOverflow(null);
          if (ref.current !== null) {
            ref.current.style.transform = '';
          }
        }}
        className={innerClassName}
        ref={ref}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}
