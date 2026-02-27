# Sprint 4: DOM Rendering + Event Wiring

## Goal
Connect the game logic to the DOM so the game is playable.

## Tasks

- [x] Define `state` object (board, currentPlayer, gameOver, scores)
- [x] Implement `initBoard()`: create 9 cell buttons, attach click listeners
- [x] Implement `render()`: sync cell text and disabled/aria state to board state
- [x] Implement `updateStatus(msg)`: set #status text content
- [x] Implement `highlightWin(combo)`: add `.win` class to winning cells
- [x] Implement `handleCellClick(i)`: full move flow (guard → update → render → check end)
- [x] Wire `DOMContentLoaded` → `initBoard()`
- [x] Wire `#reset-btn` click → `resetGame()` (stub for now)
- [x] Manually verify game plays through to a win and a draw
