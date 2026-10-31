import Lenis from 'lenis';

/** Wheel scrolling that glides to a stop; reduced motion keeps it 1:1, and the open menu (root overflow hidden) pauses it. */
export function enhanceScroll() {
  return new Lenis({ autoRaf: true, autoToggle: true });
}
