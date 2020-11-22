import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import React from 'react';

interface Props extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
}

export default function FadeIn({ children, delay = 0, duration = 0.5, animate, ...props }: Props) {
  const variants: Variants = {
    show: (i: number = 1) => ({
      opacity: 1,
      transition: {
        delay: i * delay,
        duration: duration,
      },
    }),
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div {...props} variants={variants} initial="hidden" animate={animate}>
      {children}
    </motion.div>
  );
}
