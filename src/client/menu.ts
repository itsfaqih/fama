import { roveWithArrows } from './rove';

function restartEntrance(element: HTMLElement) {
  element.removeAttribute('data-in');
  void element.offsetWidth;
  element.setAttribute('data-in', '');
}

export function enhanceMenu() {
  const menu = document.getElementById('menu');

  const trigger = document.querySelector<HTMLAnchorElement>('a[aria-controls="menu"]');

  if (!menu || !trigger) {
    return () => {};
  }

  const root = document.documentElement;

  const links = [...menu.querySelectorAll<HTMLAnchorElement>('a')];

  const controller = new AbortController();

  const { signal } = controller;

  const isOpen = () => root.hasAttribute('data-menu-open');

  const open = ({ focusFirstLink }: { focusFirstLink: boolean }) => {
    restartEntrance(menu);
    root.setAttribute('data-menu-open', '');
    trigger.setAttribute('aria-expanded', 'true');

    if (focusFirstLink) {
      links[0]?.focus();
    }
  };

  const close = ({ focusTrigger }: { focusTrigger: boolean }) => {
    root.removeAttribute('data-menu-open');
    trigger.setAttribute('aria-expanded', 'false');

    if (focusTrigger) {
      trigger.focus();
    }
  };

  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-expanded', 'false');

  trigger.addEventListener(
    'click',
    (event) => {
      event.preventDefault();

      if (isOpen()) {
        close({ focusTrigger: false });
      } else {
        open({ focusFirstLink: event.detail === 0 });
      }
    },
    { signal },
  );

  trigger.addEventListener(
    'keydown',
    (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        trigger.click();
      }
    },
    { signal },
  );

  menu.addEventListener('click', () => close({ focusTrigger: false }), { signal });

  menu.addEventListener(
    'focusout',
    (event) => {
      const next = event.relatedTarget;

      if (isOpen() && next instanceof Node && !menu.contains(next) && next !== trigger) {
        close({ focusTrigger: false });
      }
    },
    { signal },
  );

  roveWithArrows(menu, links);

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && isOpen()) {
        close({ focusTrigger: true });
      }
    },
    { signal },
  );

  if (location.hash === '#menu') {
    history.replaceState(null, '', location.pathname + location.search);
    open({ focusFirstLink: false });
  }

  return () => {
    controller.abort();
    close({ focusTrigger: false });
  };
}
