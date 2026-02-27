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

/**
 * Sync the 9 cell buttons to the current board state.
 * Creates buttons on first call; updates text/classes/disabled on every call.
 */
function renderBoard() {
  const boardEl = document.getElementById('board');

  state.board.forEach((value, index) => {
    // Reuse an existing button or create a new one
    let cell = boardEl.querySelector(`[data-index="${index}"]`);
    if (!cell) {
      cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cell';
      cell.dataset.index = index;
      // Accessible label: "Row N, Column M" (1-based)
      const row = Math.floor(index / 3) + 1;
      const col = (index % 3) + 1;
      cell.setAttribute('aria-label', `Row ${row}, Column ${col}`);
      cell.addEventListener('click', () => handleCellClick(index));
      boardEl.appendChild(cell);
    }

    // Update content and classes to reflect current value
    cell.textContent = value || '';
    cell.className = 'cell' + (value ? ` ${value.toLowerCase()}` : '');
    // Disable if the cell is taken or the game is over
    cell.disabled = Boolean(value) || state.gameOver;
  });
}

/**
 * Update the status paragraph to show whose turn it is,
 * or the outcome (win / draw).
 */
function updateStatus() {
  const statusEl = document.getElementById('status');
  if (state.gameOver) return; // outcome text set by handleCellClick
  statusEl.textContent = `Player ${state.currentPlayer}'s turn`;
}

/**
 * Add the `.win` CSS class to each cell in the winning line.
 * Called once when a winner is declared; `initGame` wipes the classes
 * on reset via renderBoard (which rebuilds className from scratch).
 * @param {number[]} line - array of 3 cell indices
 */
function highlightWin(line) {
  const boardEl = document.getElementById('board');
  line.forEach((index) => {
    const cell = boardEl.querySelector(`[data-index="${index}"]`);
    if (cell) cell.classList.add('win');
  });
}

/**
 * Increment the winner's score in state and refresh the scoreboard DOM.
 * Only called on a win — draws do not affect scores.
 * @param {string} winner - 'X' or 'O'
 */
function updateScores(winner) {
  state.scores[winner]++;
  document.getElementById('score-x').textContent = state.scores.X;
  document.getElementById('score-o').textContent = state.scores.O;
}

// ---------------------------------------------------------------------------
// Core game actions
// ---------------------------------------------------------------------------

/**
 * Handle a player clicking cell at `index`.
 * Validates the move, updates state, re-renders, and checks for win/draw.
 * @param {number} index - 0–8
 */
function handleCellClick(index) {
  // Ignore clicks when game is over or cell is already taken
  if (state.gameOver || state.board[index]) return;

  // Record the move
  state.board[index] = state.currentPlayer;
  renderBoard();

  // Check for a win after the move
  const result = checkWinner(state.board);
  if (result) {
    state.gameOver = true;
    renderBoard(); // re-render to disable all cells now game is over
    highlightWin(result.line);
    updateScores(result.winner);
    document.getElementById('status').textContent =
      `Player ${result.winner} wins!`;
    return;
  }

  // Check for a draw
  if (checkDraw(state.board)) {
    state.gameOver = true;
    renderBoard();
    document.getElementById('status').textContent = "It's a draw!";
    return;
  }

  // Game continues — switch player
  state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

/**
 * Reset the board for a new game, keeping cumulative scores intact.
 * Player X always goes first.
 */
function initGame() {
  state.board = Array(9).fill(null);
  state.currentPlayer = 'X';
  state.gameOver = false;
  renderBoard();
  updateStatus();
}

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
  module.exports = { checkWinner, checkDraw, state, WIN_LINES };
}
