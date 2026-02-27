/* ============================================================
   app.js — Tic-Tac-Toe
   Pure game logic lives here (Sprint 3).
   DOM wiring is added in Sprint 4+.
   ============================================================ */

/* All eight lines that constitute a win on a 3×3 board.
   Indices map to the flat board array (row-major order):
     0 | 1 | 2
     3 | 4 | 5
     6 | 7 | 8 */
const WIN_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left → bottom-right
  [2, 4, 6], // diagonal top-right → bottom-left
];

/**
 * checkWinner
 * Scans every winning combination against the current board.
 *
 * @param {Array<null|'X'|'O'>} board — 9-element flat array
 * @returns {{ winner: 'X'|'O', combo: number[] } | null}
 */
function checkWinner(board) {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    // All three cells must be non-null and identical
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  return null;
}

/**
 * checkDraw
 * A draw occurs when every cell is filled but nobody has won.
 *
 * @param {Array<null|'X'|'O'>} board
 * @returns {boolean}
 */
function checkDraw(board) {
  return board.every((cell) => cell !== null) && checkWinner(board) === null;
}

/* Export functions for the Node.js test runner.
   In the browser these globals are available on window. */
if (typeof module !== 'undefined') {
  module.exports = { WIN_COMBOS, checkWinner, checkDraw };
}
