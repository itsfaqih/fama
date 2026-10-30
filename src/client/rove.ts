export function roveWithArrows(container: HTMLElement, links: HTMLElement[]) {
  container.addEventListener('keydown', (event) => {
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];

    const current = links.findIndex((link) => link === document.activeElement);

    if (step !== undefined && current !== -1) {
      event.preventDefault();
      links[(current + step + links.length) % links.length]?.focus();
    }
  });
}
