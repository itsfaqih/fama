import React from 'react';

export default function Stripes({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 199 197"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 27.1806V33.5152L33.8184 0H27.4264L0 27.1806ZM53.8795 0L0 53.3965V59.7311L60.2714 0H53.8795ZM78.3504 0L0 77.648V83.9827L84.7423 0H78.3504ZM104.966 0L0 104.025V110.36L111.358 0H104.966ZM130.401 0L0 129.232V135.567L136.793 0H130.401ZM154.445 0L0 153.061V159.395L160.837 0H154.445ZM181.175 0L0 179.551V185.886L187.567 0H181.175ZM198.331 9.47616L9.11099 197H15.5029L198.331 15.8108V9.47616ZM198.331 31.8572L31.6945 197H38.0864L198.331 38.1919V31.8572Z"
      />
    </svg>
  );
}
