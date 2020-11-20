import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  label?: string;
  as?: 'button' | 'a';
  href?: string;
  className?: string;
}

export default function FullRoundButton({
  children,
  label,
  as = 'button',
  href = '',
  className,
}: Props) {
  const classes = classNames(
    'flex items-center justify-center w-12 h-12 text-white bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2',
    className
  );

  if (as === 'button') {
    return (
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={classes}>
        {children}
        <span className="sr-only">{label}</span>
      </motion.button>
    );
  }
  return (
    <motion.a href={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={classes}>
      {children}
      <span className="sr-only">{label}</span>
    </motion.a>
  );
}
