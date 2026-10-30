# Screenshots for review

A screenshot shows a reviewer where the change is. Take it as a **crop** of the changed part, **annotated** so the eye lands on each change, and explained by number in the caption. Capture the whole page only when the change affects the whole page (layout, theme, navigation).

- **Crop** to the changed elements plus their context, with 24px of padding. The tool below computes the crop from the marks.
- **Annotate** with `tools/screenshots/annotate.js`, which draws on the page before the capture:
  - `box` outlines an element, `arrow` points at it from a side (`from`), `both` does both.
  - `label` is the badge text. Number the changes `1`, `2`, `3` in reading order; use letters for supporting context.
  - `note` is an optional pill of about six words beside the badge. The caption carries the full explanation.
- **Caption** each image with one line per label: `1: Save disables while the request runs. 2: The toast confirms the new name.`

Open each image at full size before you use it: every label is legible, nothing covers the change, and the crop shows the whole mark.

## Drawing the marks

`tools/screenshots/annotate.js` runs in the page. The agent browser driver (`docs/stack.md`) takes the screenshot in four steps:

1. **Load** `annotate.js` into the page with the driver's evaluate-script call. Load it again after each page load.
2. **Draw** by evaluating `window.__annotate.draw(marks)`, where `marks` is a list such as `{ target: '#save', kind: 'both', from: 'right', label: '1', note: 'Disabled while saving' }` and `{ target: '[role=status]', label: '2', note: 'New confirmation toast' }`. `draw` returns the crop (`{ x, y, width, height }`) and adds an empty `#__annotate-crop` element over it.
3. **Capture** the crop: screenshot the `#__annotate-crop` element, or screenshot the page clipped to the returned rectangle. Some drivers capture an element only while it sits inside the viewport at scroll position 0, so a crop that ends below the viewport comes out blank. In that case, scroll to the top, set the viewport height to at least `y + height`, draw again (the layout may shift), and capture. For a whole-page capture, skip the crop and capture the full page.
4. **Clear** with `window.__annotate.clear()`.
