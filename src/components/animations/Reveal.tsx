import React, { useState } from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import classNames from 'classnames';

interface Props extends HTMLMotionProps<'div'> {
  duration?: number;
  delay?: number;
  from: 'left' | 'top' | 'right' | 'bottom';
}

export default function Reveal({
  children,
  duration,
  from,
  delay = 0.6,
  className,
  ...props
}: Props) {
  const [animatedFinish, setAnimatedFinish] = useState(false);
  const variants: Variants = {
    show: (i: number = 1) => ({
      ...(from === 'right' && { x: '-100%' }),
      ...(from === 'left' && { x: '100%' }),
      ...(from === 'bottom' && { y: '-100%' }),
      ...(from === 'top' && { y: '100%' }),
      transition: {
        delay: i * delay,
        duration: duration,
      },
    }),
    hidden: {
      x: 0,
      y: 0,
    },
  };

  return (
    <div className={classNames('overflow-hidden relative', className)}>
      {children}
      <motion.div
        className={classNames('absolute top-0 left-0 w-full h-full', {
          'bg-indigo-500': !animatedFinish,
        })}
        variants={variants}
        initial="hidden"
        animate="show"
        {...props}
        onAnimationComplete={() => setAnimatedFinish(true)}
      />
    </div>
  );
}
