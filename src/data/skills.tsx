import React from 'react';
import { Icon } from '@iconify/react';
import reactIcon from '@iconify/icons-logos/react';
import tailwindcssIcon from '@iconify/icons-logos/tailwindcss-icon';
import laravelIcon from '@iconify/icons-logos/laravel';
import codeigniterIcon from '@iconify/icons-logos/codeigniter';
import postCssIcon from '@iconify/icons-logos/postcss';
import bootstrapIcon from '@iconify/icons-logos/bootstrap';
import nextjsIcon from '@iconify/icons-logos/nextjs';

const skills = [
  <a key="react" href="https://reactjs.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={reactIcon} />
  </a>,
  <a key="tailwindcss" href="https://tailwindcss.com" className="focus:outline-none">
    <Icon className="text-4xl" icon={tailwindcssIcon} />
  </a>,
  <a key="laravel" href="https://laravel.com" className="focus:outline-none">
    <Icon className="text-5xl" icon={laravelIcon} />
  </a>,
  <a key="codeigniter" href="https://codeigniter.com" className="focus:outline-none">
    <Icon className="text-6xl" icon={codeigniterIcon} />
  </a>,
  <a key="postcss" href="https://postcss.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={postCssIcon} />
  </a>,
  <a key="bootstrap" href="https://getboostrap.com" className="focus:outline-none">
    <Icon className="text-5xl" icon={bootstrapIcon} />
  </a>,
  <a key="nextjs" href="https://nextjs.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={nextjsIcon} />
  </a>,
];

export default skills;
