# Sprint 4 — Score Tracking & New Game Reset

**Goal:** Wins are counted across games. The New Game button resets the board without clearing scores.

## Tasks

- [x] Implement `updateScores()` — increment winner's score in state, update scoreboard DOM
- [x] Call `updateScores()` when a winner is declared
- [x] Implement `initGame()` — resets board, currentPlayer, gameOver; does NOT reset scores
- [x] Wire the New Game button to `initGame()`
- [x] Write tests: score increments on win, score does not increment on draw, reset does not clear scores
- [x] Run tests and confirm all pass

## Acceptance Criteria

- Scoreboard shows correct cumulative win counts for X and O
- New Game button clears the board and starts a fresh game with X going first
- Scores survive across multiple New Game resets
- All new tests pass
