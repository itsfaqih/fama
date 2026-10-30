import React from 'react';
import { Logo } from 'components/atoms';

const skills = [
  <a key="react" aria-label="React" href="https://reactjs.org" className="focus:outline-none">
    <Logo name="react" height={48} />
  </a>,
  <a
    key="tailwindcss"
    aria-label="Tailwind CSS"
    href="https://tailwindcss.com"
    className="focus:outline-none"
  >
    <Logo name="tailwindcss" height={36} />
  </a>,
  <a key="laravel" aria-label="Laravel" href="https://laravel.com" className="focus:outline-none">
    <Logo name="laravel" height={48} />
  </a>,
  <a
    key="codeigniter"
    aria-label="CodeIgniter"
    href="https://codeigniter.com"
    className="focus:outline-none"
  >
    <Logo name="codeigniter" height={60} />
  </a>,
  <a key="postcss" aria-label="PostCSS" href="https://postcss.org" className="focus:outline-none">
    <Logo name="postcss" height={48} />
  </a>,
  <a
    key="bootstrap"
    aria-label="Bootstrap"
    href="https://getbootstrap.com"
    className="focus:outline-none"
  >
    <Logo name="bootstrap" height={48} />
  </a>,
  <a key="nextjs" aria-label="Next.js" href="https://nextjs.org" className="focus:outline-none">
    <Logo name="nextjs" height={48} />
  </a>,
];

export default skills;
