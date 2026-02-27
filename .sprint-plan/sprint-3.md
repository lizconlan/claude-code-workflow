# Sprint 3 — Win & Draw Detection

**Goal:** The game knows when it's over. A winner or draw is announced, and no further moves can be made.

## Tasks

- [x] Implement `checkWinner(board)` — pure function, checks all 8 WIN_LINES, returns `{ winner, line }` or null
- [x] Implement `checkDraw(board)` — pure function, returns true if board is full with no winner
- [x] Wire win/draw checking into `handleCellClick` after each move
- [x] Update `updateStatus()` to display win ("Player X wins!") or draw ("It's a draw!")
- [x] Set `gameOver = true` on win or draw to block further clicks
- [x] Write tests: all 8 win lines detected correctly, draw detected, no false positives
- [x] Run tests and confirm all pass

## Acceptance Criteria

- Completing a row/column/diagonal displays the winner message
- Filling all 9 cells with no winner displays draw message
- No further clicks are processed after the game ends
- All new tests pass
