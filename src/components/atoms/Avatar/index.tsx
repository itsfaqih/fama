import React from 'react';
import { cn } from 'cn';

interface Props {
  image: { jpeg: string; avif: { small: string; large: string } };
  alt: string;
  className?: string;
}

export default function Avatar({ image, alt, className }: Props) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${image.avif.small} 240w, ${image.avif.large} 480w`}
        sizes="(min-width: 48rem) 240px, 112px"
      />
      <img
        src={image.jpeg}
        alt={alt}
        width="auto"
        height="auto"
        fetchPriority="high"
        className={cn(
          'object-cover border-4 border-indigo-400 rounded-3xl w-28 h-28 md:w-60 md:h-60 shadow-xl',
          className,
        )}
      />
    </picture>
  );
}
