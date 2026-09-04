import React from 'react';
import { motion, SVGMotionProps, Variants } from 'motion/react';
import { cn } from 'cn';

export default function TitleLine({ className, ...props }: SVGMotionProps<SVGElement>) {
  const variants: Variants = {
    show: {
      width: '100%',
    },
    hidden: {
      width: 0,
    },
  };

  return (
    <svg className={cn('w-20 h-1 text-indigo-600 mt-3', className)} fill="currentColor">
      <motion.rect variants={variants} initial="hidden" animate="show" height="100%" {...props} />
    </svg>
  );
}
