import type Lenis from 'lenis';

export function enhanceSmoothScroll(lenis: Lenis) {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-smooth-scroll]')) {
    link.addEventListener('click', (event) => {
      const target = document.querySelector<HTMLElement>(link.hash);

      if (target) {
        event.preventDefault();
        // From the live scroll position: Lenis's cached one lags a frame behind native scrolls.
        lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY);
      }
    });
  }
}
