# Sprint 4: DOM Rendering + Event Wiring

## Goal
Connect the game logic to the DOM so the game is playable.

## Tasks

- [ ] Define `state` object (board, currentPlayer, gameOver, scores)
- [ ] Implement `initBoard()`: create 9 cell buttons, attach click listeners
- [ ] Implement `render()`: sync cell text and disabled/aria state to board state
- [ ] Implement `updateStatus(msg)`: set #status text content
- [ ] Implement `highlightWin(combo)`: add `.win` class to winning cells
- [ ] Implement `handleCellClick(i)`: full move flow (guard → update → render → check end)
- [ ] Wire `DOMContentLoaded` → `initBoard()`
- [ ] Wire `#reset-btn` click → `resetGame()` (stub for now)
- [ ] Manually verify game plays through to a win and a draw
