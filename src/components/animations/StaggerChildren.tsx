import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import React from 'react';

interface Props extends HTMLMotionProps<'div'> {
  duration?: number;
  delay?: number;
}

export default function StaggerChildren({ children, duration = 0.5, delay = 0, ...props }: Props) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    show: (i: number = 1) => ({
      opacity: 1,
      transition: {
        delay: delay,
        staggerChildren: duration,
        delayChildren: i * delay,
      },
    }),
  };

  return (
    <motion.div variants={variants} initial="hidden" animate="show" {...props}>
      {children}
    </motion.div>
  );
}
