const inset = 4;

const minHeight = 32;

const nearEdge = 48;

const idleMs = 1000;

/** Replaces the native scrollbar with a thumb that shows only while the page scrolls, the cursor nears it, or it is dragged. */
export function enhanceScrollThumb(scrollTo: (y: number) => void) {
  const root = document.documentElement;

  const thumb = document.createElement('div');

  thumb.className = 'scroll-thumb';
  thumb.dataset['testid'] = 'scroll-thumb';
  thumb.setAttribute('aria-hidden', 'true');
  document.body.append(thumb);
  root.setAttribute('data-scroll-thumb', '');

  const state = { scrolling: false, near: false, dragging: false };

  let idle: number | undefined;

  let geometry = { height: 0, travel: 0, scrollable: 0 };

  const place = () => {
    const track = window.innerHeight - inset * 2;

    const scrollable = root.scrollHeight - window.innerHeight;

    const height = Math.max(minHeight, (track * window.innerHeight) / root.scrollHeight);

    geometry = { height, travel: track - height, scrollable };
    thumb.hidden = scrollable <= 0;
    thumb.style.height = `${height}px`;
    thumb.style.translate = `0 ${inset + geometry.travel * (window.scrollY / Math.max(scrollable, 1))}px`;
  };

  const show = () => {
    thumb.toggleAttribute('data-visible', state.scrolling || state.near || state.dragging);
  };

  window.addEventListener(
    'scroll',
    () => {
      place();
      state.scrolling = true;
      show();
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        state.scrolling = false;
        show();
      }, idleMs);
    },
    { passive: true },
  );

  window.addEventListener('resize', place);
  new ResizeObserver(place).observe(document.body);

  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType === 'mouse') {
        state.near = window.innerWidth - event.clientX <= nearEdge;
        show();
      }
    },
    { passive: true },
  );

  document.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget) {
      state.near = false;
      show();
    }
  });

  let drag = { pointerY: 0, scrollY: 0 };

  thumb.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    thumb.setPointerCapture(event.pointerId);
    drag = { pointerY: event.clientY, scrollY: window.scrollY };
    state.dragging = true;
    show();
  });

  thumb.addEventListener('pointermove', (event) => {
    if (state.dragging && geometry.travel > 0) {
      const moved = (event.clientY - drag.pointerY) * (geometry.scrollable / geometry.travel);

      scrollTo(Math.min(Math.max(drag.scrollY + moved, 0), geometry.scrollable));
    }
  });

  const endDrag = () => {
    state.dragging = false;
    show();
  };

  thumb.addEventListener('pointerup', endDrag);
  thumb.addEventListener('pointercancel', endDrag);

  place();
}
