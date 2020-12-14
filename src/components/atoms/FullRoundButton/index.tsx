import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import FullRoundButtonProps from 'components/atoms/FullRoundButton/types';

export default function FullRoundButton({
  children,
  label,
  as = 'button',
  href = '',
  className,
  active = false,
  onClick,
}: FullRoundButtonProps) {
  const classes = classNames(
    'flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2 shadow-lg',
    className,
    {
      'bg-indigo-500 hover:bg-indigo-600 text-white': !active,
      'bg-white text-indigo-600': active,
    }
  );

  if (as === 'button') {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className={classes}
        onClick={onClick}
      >
        {children}
        <span className="sr-only">{label}</span>
      </motion.button>
    );
  }
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={classes}
      onClick={onClick}
    >
      {children}
      <span className="sr-only">{label}</span>
    </motion.a>
  );
}
