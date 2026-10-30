export function enhanceSmoothScroll() {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-smooth-scroll]')) {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.hash);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
