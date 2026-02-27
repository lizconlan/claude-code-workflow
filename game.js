/**
 * game.js — Tic-Tac-Toe
 *
 * Single-file vanilla JS implementation.
 * All game state is held in the `state` object; the DOM is always
 * derived from state (never read back from it).
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** All 8 lines that can produce a win (indices into the flat 9-cell board). */
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
];

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

/**
 * Central mutable state.  Only game.js mutates this object directly.
 * Tests can import and manipulate it for unit testing pure functions.
 */
const state = {
  board: Array(9).fill(null), // null | 'X' | 'O'
  currentPlayer: 'X',         // 'X' | 'O'
  gameOver: false,
  scores: { X: 0, O: 0 },    // cumulative per session
};

// ---------------------------------------------------------------------------
// Pure helper functions (no DOM, easily unit-tested)
// ---------------------------------------------------------------------------

/**
 * Check whether the given board has a winner.
 * @param {Array<null|string>} board - 9-element array
 * @returns {{ winner: string, line: number[] } | null}
 */
function checkWinner(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

/**
 * Check whether the board is a draw (all cells filled, no winner).
 * @param {Array<null|string>} board
 * @returns {boolean}
 */
function checkDraw(board) {
  return board.every((cell) => cell !== null) && checkWinner(board) === null;
}

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

/** Stub: will be implemented in Sprint 2 */
function renderBoard() {}

/** Stub: will be implemented in Sprint 2 */
function updateStatus() {}

/** Stub: will be implemented in Sprint 5 */
function highlightWin(_line) {}

/** Stub: will be implemented in Sprint 4 */
function updateScores() {}

// ---------------------------------------------------------------------------
// Core game actions
// ---------------------------------------------------------------------------

/** Stub: will be implemented in Sprint 2 */
function handleCellClick(_index) {}

/** Stub: will be implemented in Sprint 4 */
function initGame() {}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

// Wire up the reset button once the DOM is ready.
// Guard prevents this from running under Node.js (test environment).
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-reset').addEventListener('click', initGame);
    initGame();
  });
}

// ---------------------------------------------------------------------------
// Exports — used by game.test.js (loaded as a module in Node / inline script)
// ---------------------------------------------------------------------------

// Allow test file to import pure functions without running the browser bootstrap.
if (typeof module !== 'undefined') {
  module.exports = { checkWinner, checkDraw, state };
}
