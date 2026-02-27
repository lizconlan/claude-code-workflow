# Sprint 2 — Board Rendering & Cell Interaction

**Goal:** Players can click cells and see X/O appear. Turn alternation works. Claimed cells are disabled.

## Tasks

- [x] Implement `renderBoard()` — create/update 9 `<button>` cell elements from state
- [x] Implement `handleCellClick(index)` — mark cell, switch player, re-render
- [x] Implement `updateStatus()` — show "Player X's turn" / "Player O's turn"
- [x] Wire click events on cells
- [x] Write tests: cell state is updated on click, occupied cell cannot be overwritten, players alternate
- [x] Run tests and confirm all pass

## Acceptance Criteria

- Clicking an empty cell marks it with X or O in alternation
- Clicking an already-claimed cell has no effect
- Status text updates to show the correct current player
- All new tests pass
