import React from 'react';

interface Props {
  children: React.ReactNode;
  custom?: number;
  delay?: number;
}

export default function FadeIn({ children, custom = 1, delay = 0 }: Props) {
  return (
    <div className="fade" style={{ '--delay': `${custom * delay}s`, '--duration': '0.5s' }}>
      {children}
    </div>
  );
}
