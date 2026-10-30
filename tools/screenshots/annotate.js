// Page-side screenshot annotations: boxes, arrows, and numbered badges with short notes.
// Load this file into the page with the driver's evaluate-script call (docs/screenshots.md),
// then call window.__annotate.draw(marks, options). draw() returns the crop rectangle
// { x, y, width, height } in document coordinates that holds every mark plus padding,
// and adds an empty element over it with id "__annotate-crop" for element-only screenshots.
// Some drivers capture an element only inside the viewport at scroll position 0, so size the
// viewport to at least y + height of the returned crop first.
//
// mark: {
//   target: CSS selector of the element to point at   (or rect: { x, y, width, height } in document coordinates)
//   kind:   'box' (default) | 'arrow' | 'both'
//   label:  '1' | 'A'   the badge text; the PR caption explains each label
//   note:   optional short text shown beside the badge (about 6 words)
//   from:   'top' | 'right' | 'bottom' | 'left'   where an arrow starts (default 'left')
// }
// options: { color: '#e5173f', padding: 24 }
//
// Checked by tsc through JSDoc (tsconfig checkJs); the Window global is declared in globals.d.ts.

/** @typedef {{ x: number, y: number, width: number, height: number }} Rect */
/** @typedef {[number, number]} Point */
/** @typedef {'top' | 'right' | 'bottom' | 'left'} Side */
/**
 * @typedef {object} Mark
 * @property {string} [target]
 * @property {Rect} [rect]
 * @property {'box' | 'arrow' | 'both'} [kind]
 * @property {string} [label]
 * @property {string} [note]
 * @property {Side} [from]
 */
/** @typedef {{ color?: string, padding?: number }} Options */

(() => {
  if (window.__annotate) return;
  const ID = '__annotate-root';
  const SVG = 'http://www.w3.org/2000/svg';

  const clear = () => document.getElementById(ID)?.remove();

  /** @type {(mark: Mark) => Rect} */
  const rectOf = (mark) => {
    if (mark.rect) return mark.rect;
    const el = mark.target === undefined ? null : document.querySelector(mark.target);

    if (!el) throw new Error(`annotate: no element matches "${mark.target}"`);
    const r = el.getBoundingClientRect();

    return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height };
  };

  /**
   * @template {HTMLElement} T
   * @param {T} el
   * @param {number} x
   * @param {number} y
   * @param {number} [w]
   * @param {number} [h]
   * @returns {T}
   */
  const place = (el, x, y, w, h) => {
    Object.assign(el.style, { position: 'absolute', left: `${x}px`, top: `${y}px` });

    if (w != null) Object.assign(el.style, { width: `${w}px`, height: `${h}px` });

    return el;
  };

  /** @type {(r: Rect, from: Side, gap: number, length: number) => { head: Point, start: Point }} */
  const tail = (r, from, gap, length) => {
    const cx = r.x + r.width / 2;
    const cy = r.y + r.height / 2;

    if (from === 'top') return { head: [cx, r.y - gap], start: [cx, r.y - gap - length] };

    if (from === 'bottom')
      return { head: [cx, r.y + r.height + gap], start: [cx, r.y + r.height + gap + length] };

    if (from === 'right')
      return { head: [r.x + r.width + gap, cy], start: [r.x + r.width + gap + length, cy] };

    return { head: [r.x - gap, cy], start: [r.x - gap - length, cy] };
  };

  /** @type {(marks: Mark[], options?: Options) => Rect} */
  const draw = (marks, options = {}) => {
    clear();
    const color = options.color ?? '#e5173f';
    const padding = options.padding ?? 24;
    const doc = document.documentElement;
    const root = document.createElement('div');
    root.id = ID;
    Object.assign(root.style, {
      position: 'absolute',
      left: '0',
      top: '0',
      pointerEvents: 'none',
      zIndex: '2147483647',
      width: `${doc.scrollWidth}px`,
      height: `${doc.scrollHeight}px`,
    });

    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('width', String(doc.scrollWidth));
    svg.setAttribute('height', String(doc.scrollHeight));
    svg.style.position = 'absolute';
    svg.innerHTML = `<defs><marker id="${ID}-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${color}"/></marker></defs>`;
    root.append(svg);

    for (const mark of marks) {
      const r = rectOf(mark);
      const kind = mark.kind ?? 'box';
      /** @type {Point} */
      let badgeAt = [r.x - 17, r.y - 17];
      /** @type {Point} */
      let noteAt = [r.x + 17, r.y - 34];

      if (kind === 'box' || kind === 'both') {
        const box = place(
          document.createElement('div'),
          r.x - 4,
          r.y - 4,
          r.width + 8,
          r.height + 8,
        );

        Object.assign(box.style, {
          boxSizing: 'border-box',
          border: `3px solid ${color}`,
          borderRadius: '6px',
          background: `${color}14`,
        });
        box.setAttribute('data-annot', '');
        root.append(box);
      }

      if (kind === 'arrow' || kind === 'both') {
        const { head, start } = tail(r, mark.from ?? 'left', kind === 'both' ? 10 : 6, 72);
        const line = document.createElementNS(SVG, 'line');
        line.setAttribute('x1', String(start[0]));
        line.setAttribute('y1', String(start[1]));
        line.setAttribute('x2', String(head[0]));
        line.setAttribute('y2', String(head[1]));
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '4');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('marker-end', `url(#${ID}-head)`);
        svg.append(line);
        badgeAt = [start[0] - 13, start[1] - 13];
        noteAt = [start[0] + 21, start[1] - 13];
      }

      if (mark.label) {
        const badge = place(document.createElement('div'), badgeAt[0], badgeAt[1]);
        badge.textContent = mark.label;
        badge.setAttribute('data-annot', '');
        Object.assign(badge.style, {
          minWidth: '26px',
          height: '26px',
          padding: '0 4px',
          boxSizing: 'border-box',
          borderRadius: '13px',
          background: color,
          color: '#fff',
          font: '700 15px/26px system-ui, sans-serif',
          textAlign: 'center',
          boxShadow: '0 0 0 2px #fff',
        });
        root.append(badge);

        if (mark.note) {
          const note = place(document.createElement('div'), noteAt[0], noteAt[1]);
          note.textContent = mark.note;
          note.setAttribute('data-annot', '');
          Object.assign(note.style, {
            maxWidth: '260px',
            padding: '3px 9px',
            borderRadius: '6px',
            background: '#fff',
            color: '#111',
            border: `2px solid ${color}`,
            font: '600 13px/18px system-ui, sans-serif',
          });
          root.append(note);
        }
      }
    }

    doc.append(root);

    let x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

    /** @type {(x: number, y: number, w: number, h: number) => void} */
    const grow = (x, y, w, h) => {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x + w);
      y1 = Math.max(y1, y + h);
    };

    for (const mark of marks) {
      const r = rectOf(mark);
      grow(r.x, r.y, r.width, r.height);
    }

    for (const el of root.querySelectorAll('[data-annot]')) {
      const r = el.getBoundingClientRect();
      grow(r.left + scrollX, r.top + scrollY, r.width, r.height);
    }

    for (const line of svg.querySelectorAll('line')) {
      for (const n of ['1', '2'])
        grow(
          Number(line.getAttribute(`x${n}`)) - 8,
          Number(line.getAttribute(`y${n}`)) - 8,
          16,
          16,
        );
    }

    const x = Math.max(0, Math.floor(x0 - padding));
    const y = Math.max(0, Math.floor(y0 - padding));

    const crop = {
      x,
      y,
      width: Math.min(doc.scrollWidth, Math.ceil(x1 + padding)) - x,
      height: Math.min(doc.scrollHeight, Math.ceil(y1 + padding)) - y,
    };

    // An element over the crop rectangle, so a tool that only crops to an element can screenshot "#__annotate-crop".
    const frame = place(document.createElement('div'), crop.x, crop.y, crop.width, crop.height);
    frame.id = '__annotate-crop';
    root.append(frame);

    return crop;
  };

  window.__annotate = { draw, clear };
})();
