import React from 'react';
import { motion, Variants, SVGMotionProps } from 'framer-motion';
import classNames from 'classnames';

interface Props extends SVGMotionProps<SVGElement> {
  rad: number;
  delay?: number;
}

export default function Highlighter({ className, rad, delay = 0, ...props }: Props) {
  const variants: Variants = {
    show: (i: number = 1) => ({
      width: '100%',
      transition: {
        type: 'tween',
        delay: i * delay,
        duration: 0.7,
      },
    }),
    hidden: {
      width: 0,
    },
  };

  return (
    <svg
      className={classNames('absolute w-full-2 text-indigo-200 -z-10 -left-1', className)}
      fill="currentColor"
    >
      <motion.rect
        height="100%"
        rx={rad}
        ry={rad}
        variants={variants}
        initial="hidden"
        animate="show"
        {...props}
      />
    </svg>
  );
}
