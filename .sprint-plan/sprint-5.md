# Sprint 5: Score Tracking + Reset

## Goal
Implement score persistence across resets and the full reset flow.

## Tasks

- [ ] Implement `updateScoreboard()`: update #score-x, #score-draw, #score-o text
- [ ] Call `updateScoreboard()` on win and draw
- [ ] Implement `resetGame()`: clear board array, reset currentPlayer to 'X', set gameOver false, re-render, clear .win highlights, update status
- [ ] Verify scores accumulate correctly across multiple games
- [ ] Add tests T-08, T-09, T-10 to test.js; all pass
