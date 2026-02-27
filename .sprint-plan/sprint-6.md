# Sprint 6: Accessibility Pass + Polish

## Goal
Ensure the app meets WCAG AA and looks polished.

## Tasks

- [x] Verify all `aria-label` attributes on cells update correctly (e.g. "Cell 1, X")
- [x] Confirm `aria-live="polite"` on #status announces moves to screen readers
- [x] Check all colour contrast ratios are ≥ 4.5:1 (X: 4.63:1, O: 4.79:1, btn: 5.65:1)
- [x] Confirm focus-visible outline is visible on keyboard navigation
- [x] Confirm hover underline on any text links (rule present in style.css)
- [x] Verify font sizes are readable at default zoom (16px body, 2.25rem cells)
- [x] Disable pointer cursor on occupied/game-over cells (`.cell:disabled { cursor: default }`)
- [x] Final visual review: consistent fonts, colours, spacing
