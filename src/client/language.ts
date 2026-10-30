import { roveWithArrows } from './rove';

const storageKey = 'fama:language-switch';

/** sessionStorage, or undefined where the browser blocks site data and throws on access. */
function sessionStore() {
  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
}

function encodeReaderPlace(scrollY: number, revealed: string[]) {
  return [Math.round(scrollY), ...revealed].join(' ');
}

function decodeReaderPlace(record: string | null | undefined) {
  const [scrollY = '', ...revealed] = record?.split(' ') ?? [];

  const y = Number.parseInt(scrollY, 10);

  return Number.isFinite(y) ? { y, revealed } : undefined;
}

export function restoreReaderPlace() {
  const place = decodeReaderPlace(sessionStore()?.getItem(storageKey));

  sessionStore()?.removeItem(storageKey);

  if (!place) {
    return;
  }

  const { y, revealed } = place;

  const shown = [
    ...document.querySelectorAll<HTMLElement>('header[data-in], nav[data-in]'),
    ...revealed.flatMap((id) => {
      const section = document.getElementById(id);

      return section?.hasAttribute('data-reveal') ? [section] : [];
    }),
  ];

  for (const element of shown) {
    element.setAttribute('data-in', '');
    element.setAttribute('data-instant', '');
  }

  window.scrollTo(0, y);
}

export function enhanceLanguage() {
  const details = document.querySelector<HTMLDetailsElement>('details.language');

  const summary = details?.querySelector('summary');

  const popup = details?.querySelector<HTMLElement>('.language-popup');

  if (!details || !summary || !popup) {
    return;
  }

  const links = [...details.querySelectorAll<HTMLAnchorElement>('a')];

  let closing = false;

  const close = ({ focusSummary }: { focusSummary: boolean }) => {
    if (!details.open || closing) {
      return;
    }

    closing = true;
    details.setAttribute('data-closing', '');

    void Promise.allSettled(popup.getAnimations().map(({ finished }) => finished)).then(() => {
      details.open = false;
      details.removeAttribute('data-closing');
      closing = false;

      if (focusSummary) {
        summary.focus();
      }
    });
  };

  summary.addEventListener('click', (event) => {
    event.preventDefault();

    if (details.open) {
      close({ focusSummary: false });

      return;
    }

    details.open = true;

    if (event.detail === 0) {
      links.find((link) => link.hasAttribute('aria-current'))?.focus();
    }
  });

  roveWithArrows(details, links);

  for (const link of links) {
    link.addEventListener('click', (event) => {
      if (link.hasAttribute('aria-current')) {
        event.preventDefault();
        close({ focusSummary: true });

        return;
      }

      const revealed = [...document.querySelectorAll('[data-reveal][data-in]')].map(
        (section) => section.id,
      );

      sessionStore()?.setItem(storageKey, encodeReaderPlace(window.scrollY, revealed));
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && details.open) {
      close({ focusSummary: details.contains(document.activeElement) });
    }
  });

  document.addEventListener('click', (event) => {
    if (details.open && event.target instanceof Node && !details.contains(event.target)) {
      close({ focusSummary: false });
    }
  });
}
