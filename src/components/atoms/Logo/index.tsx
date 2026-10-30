import React from 'react';
import { cn } from 'cn';

export const logos = {
  bootstrap: [256, 256],
  codeigniter: [256, 304],
  figma: [256, 384],
  javascript: [256, 256],
  laravel: [256, 264],
  nextjs: [512, 309],
  nodejs: [256, 289],
  php: [256, 135],
  postcss: [256, 256],
  postgresql: [256, 264],
  react: [256, 228],
  'react-alt': [30, 27],
  tailwindcss: [256, 154],
  'tailwindcss-alt': [54, 33],
  typescript: [256, 256],
} as const;

interface Props {
  name: keyof typeof logos;
  height?: number;
  className?: string;
}

function iconifySize(name: Props['name'], height: number) {
  const [viewWidth, viewHeight] = logos[name];

  return { width: (Math.ceil((viewWidth / viewHeight) * 100) * height) / 100, height };
}

export default function Logo({ name, height, className }: Props) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt=""
      loading="lazy"
      style={height === undefined ? undefined : iconifySize(name, height)}
      className={cn('max-w-none', className)}
    />
  );
}
