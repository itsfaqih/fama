export function enhanceReveal() {
  for (const section of document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])')) {
    const threshold = Number(section.dataset['reveal']);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && entry.intersectionRatio >= threshold) {
          section.setAttribute('data-in', '');
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(section);
  }
}
