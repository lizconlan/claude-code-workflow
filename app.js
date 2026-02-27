/* ============================================================
   app.js — Tic-Tac-Toe
   Organised in layers:
     1. Pure game logic  (WIN_COMBOS, checkWinner, checkDraw)
     2. Application state
     3. DOM rendering helpers
     4. Event handlers
     5. Initialisation
   ============================================================ */

/* ── 1. Pure game logic ─────────────────────────────────── */

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

/* ── 2. Application state ───────────────────────────────── */

const state = {
  /* board[i] is null, 'X', or 'O' */
  board: Array(9).fill(null),
  currentPlayer: 'X',
  gameOver: false,
  /* scores persist across resets within the session */
  scores: { X: 0, O: 0, draw: 0 },
};

/* ── 3. DOM rendering helpers ───────────────────────────── */

/**
 * render
 * Synchronises every cell button's visual state with state.board.
 * Called after every move and after reset.
 */
function render() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((btn, i) => {
    const mark = state.board[i];
    btn.textContent = mark ?? '';
    // data-mark drives CSS colour rules for X and O
    if (mark) {
      btn.dataset.mark = mark;
    } else {
      delete btn.dataset.mark;
    }
    // Disable occupied cells and all cells once the game is over
    btn.disabled = mark !== null || state.gameOver;
    // Meaningful aria-label for screen readers
    btn.setAttribute(
      'aria-label',
      `Cell ${i + 1}, ${mark ? mark : 'empty'}`
    );
  });
}

/**
 * updateStatus
 * Updates the live-region paragraph that announces game state.
 *
 * @param {string} msg
 */
function updateStatus(msg) {
  document.getElementById('status').textContent = msg;
}

/**
 * highlightWin
 * Adds the .win CSS class to the three cells that form the winning line.
 *
 * @param {number[]} combo — array of three cell indices
 */
function highlightWin(combo) {
  const cells = document.querySelectorAll('.cell');
  combo.forEach((i) => cells[i].classList.add('win'));
}

/**
 * updateScoreboard
 * Reflects state.scores in the three score display elements.
 * (Stubbed here; fully active from Sprint 5.)
 */
function updateScoreboard() {
  document.getElementById('score-x').textContent    = `X: ${state.scores.X}`;
  document.getElementById('score-draw').textContent = `Draw: ${state.scores.draw}`;
  document.getElementById('score-o').textContent    = `O: ${state.scores.O}`;
}

/* ── 4. Event handlers ──────────────────────────────────── */

/**
 * handleCellClick
 * Processes a player's move at board index i.
 * Guards against illegal moves, updates state, then checks for
 * a win or draw before handing the turn to the other player.
 *
 * @param {number} i — index 0–8
 */
function handleCellClick(i) {
  // Guard: ignore clicks after game end or on occupied cells
  if (state.gameOver || state.board[i] !== null) return;

  // Record the move
  state.board[i] = state.currentPlayer;
  render();

  // Check for a winner first
  const result = checkWinner(state.board);
  if (result) {
    highlightWin(result.combo);
    state.scores[result.winner]++;
    updateScoreboard();
    updateStatus(`Player ${result.winner} wins!`);
    state.gameOver = true;
    // Re-render to disable remaining empty cells
    render();
    return;
  }

  // Check for a draw
  if (checkDraw(state.board)) {
    state.scores.draw++;
    updateScoreboard();
    updateStatus("It's a draw!");
    state.gameOver = true;
    render();
    return;
  }

  // Switch turns
  state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${state.currentPlayer}'s turn`);
}

/**
 * resetGame
 * Clears the board, removes win highlights, and restarts from X.
 * Scores are intentionally preserved.
 */
function resetGame() {
  state.board = Array(9).fill(null);
  state.currentPlayer = 'X';
  state.gameOver = false;

  // Remove win highlight class from all cells before re-render
  document.querySelectorAll('.cell').forEach((btn) => btn.classList.remove('win'));

  render();
  updateStatus("Player X's turn");
}

/* ── 5. Initialisation ──────────────────────────────────── */

/**
 * initBoard
 * Creates the 9 cell <button> elements, injects them into #board,
 * and attaches click listeners.  Called once on DOMContentLoaded.
 */
function initBoard() {
  const boardEl = document.getElementById('board');

  for (let i = 0; i < 9; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cell';
    btn.dataset.index = i;
    btn.setAttribute('aria-label', `Cell ${i + 1}, empty`);
    // Each button closes over its own index
    btn.addEventListener('click', () => handleCellClick(i));
    boardEl.appendChild(btn);
  }

  // Initial scoreboard so it always shows "0" rather than blank
  updateScoreboard();
  updateStatus("Player X's turn");
}

/* Wire everything up once the HTML is ready.
   Guard prevents this from running in the Node.js test environment
   where document does not exist. */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initBoard();
    document.getElementById('reset-btn').addEventListener('click', resetGame);
  });
}

/* ── Node.js test-runner export ─────────────────────────── */
/* In the browser these are globals; in Node they are exported. */
if (typeof module !== 'undefined') {
  module.exports = { WIN_COMBOS, checkWinner, checkDraw, state, resetGame };
}
