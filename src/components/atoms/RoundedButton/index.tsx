import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  as?: 'button' | 'a';
  href?: string;
  className?: string;
}

export default function RoundedButton({ children, as = 'button', href = '', className }: Props) {
  const classes = classNames(
    'flex items-center justify-center h-12 px-12 shadow-lg hover:shadow-none transition-shadow text-sm text-white hover:bg-indigo-600 bg-indigo-500 font-bold rounded-full transform focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2',
    className
  );

  if (as === 'button') {
    return (
      <motion.button whileHover={{ translateY: 10 }} whileTap={{ scale: 0.8 }} className={classes}>
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      whileHover={{ translateY: 10 }}
      whileTap={{ scale: 0.8 }}
      className={classes}
    >
      {children}
    </motion.a>
  );
}
