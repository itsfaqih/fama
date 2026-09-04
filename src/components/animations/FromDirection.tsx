import React, { useState } from 'react';
import { motion, HTMLMotionProps, Variants } from 'motion/react';
import { cn } from 'cn';
import { useRef } from 'react';

interface Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
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
    <div className={cn(overflow, className)}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        onAnimationComplete={(definition) => {
          if (onAnimationComplete) {
            onAnimationComplete(definition);
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
