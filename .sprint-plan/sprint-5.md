# Sprint 5 — Win Highlight & Accessibility Polish

**Goal:** The winning cells are visually highlighted. Accessibility attributes are complete and correct.

## Tasks

- [ ] Implement `highlightWin(line)` — add `.win` CSS class to the three winning cell buttons
- [ ] Add `.win` style in `style.css` (amber background, readable contrast)
- [ ] Add `aria-label="Row N, Column M"` to each cell button (set in `renderBoard`)
- [ ] Ensure status paragraph has `role="status"` and `aria-live="polite"`
- [ ] Verify all interactive elements meet 44×44px minimum hit target
- [ ] Verify colour contrast ratios meet WCAG AA (4.5:1) for all text
- [ ] Add hover underline to any text links
- [ ] Run tests and confirm all still pass
- [ ] Final manual smoke test: play a full game, verify win highlight, reset, check accessibility

## Acceptance Criteria

- Winning three cells are highlighted in amber when the game ends
- Screen reader (or VoiceOver) announces turn changes and game outcomes without requiring focus to move
- All cells are keyboard-navigable (Tab + Enter/Space)
- All tests pass
- No console errors
