import React from 'react';
import { Logo } from 'components/atoms';

const skills = [
  <a
    key="typescript"
    aria-label="TypeScript"
    href="https://www.typescriptlang.org"
    className="focus:outline-none"
  >
    <Logo name="typescript" height={48} />
  </a>,
  <a key="react" aria-label="React" href="https://react.dev" className="focus:outline-none">
    <Logo name="react" height={48} />
  </a>,
  <a key="nextjs" aria-label="Next.js" href="https://nextjs.org" className="focus:outline-none">
    <Logo name="nextjs" height={48} />
  </a>,
  <a
    key="tailwindcss"
    aria-label="Tailwind CSS"
    href="https://tailwindcss.com"
    className="focus:outline-none"
  >
    <Logo name="tailwindcss" height={36} />
  </a>,
  <a key="nodejs" aria-label="Node.js" href="https://nodejs.org" className="focus:outline-none">
    <Logo name="nodejs" height={48} />
  </a>,
  <a
    key="postgresql"
    aria-label="PostgreSQL"
    href="https://www.postgresql.org"
    className="focus:outline-none"
  >
    <Logo name="postgresql" height={48} />
  </a>,
  <a key="laravel" aria-label="Laravel" href="https://laravel.com" className="focus:outline-none">
    <Logo name="laravel" height={48} />
  </a>,
  <a key="figma" aria-label="Figma" href="https://www.figma.com" className="focus:outline-none">
    <Logo name="figma" height={48} />
  </a>,
];

export default skills;
