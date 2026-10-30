import React from 'react';

interface Props {
  text: string;
  custom?: number;
  delay?: number;
}

export default function Letter({ text, custom = 1, delay = 0 }: Props) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <div
        aria-hidden
        className="letters flex overflow-hidden"
        style={{ '--delay': `${custom * delay}s` }}
      >
        {Array.from(text, (letter, index) => (
          <span key={index} style={{ '--i': index }}>
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </>
  );
}
