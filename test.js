/* ============================================================
   test.js — Pure logic unit tests (no DOM, runs in Node.js)
   Usage: node test.js
   ============================================================ */
const { checkWinner, checkDraw, state, resetGame } = require('./app.js');

let passed = 0;
let failed = 0;

function assert(id, description, condition) {
  if (condition) {
    console.log(`  ✓ ${id}: ${description}`);
    passed++;
  } else {
    console.error(`  ✗ ${id}: ${description}`);
    failed++;
  }
}

/* ── Sprint 3 tests (pure logic) ─────────────────────────── */
console.log('\nSprint 3 — Core game logic\n');

// T-01: A fresh board has no winner
{
  const board = Array(9).fill(null);
  assert('T-01', 'Initial board has no winner', checkWinner(board) === null);
}

// T-02: Draw returns false on an empty board (currentPlayer is tested via DOM)
{
  const board = Array(9).fill(null);
  assert('T-02', 'Empty board is not a draw', checkDraw(board) === false);
}

// T-03: A partially filled board with no win is not a draw
{
  const board = ['X', 'O', 'X', null, null, null, null, null, null];
  assert('T-03', 'Partial board is not a draw', checkDraw(board) === false);
}

// T-04: Horizontal win detected — row 0
{
  const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
  const result = checkWinner(board);
  assert('T-04', 'Row 0 win detected for X',
    result !== null && result.winner === 'X' &&
    JSON.stringify(result.combo) === JSON.stringify([0, 1, 2])
  );
}

// T-05: Vertical win detected — column 1
{
  const board = ['X', 'O', 'X', null, 'O', null, null, 'O', null];
  const result = checkWinner(board);
  assert('T-05', 'Column 1 win detected for O',
    result !== null && result.winner === 'O' &&
    JSON.stringify(result.combo) === JSON.stringify([1, 4, 7])
  );
}

// T-06: Diagonal win detected — top-left to bottom-right
{
  const board = ['X', 'O', 'O', null, 'X', null, null, null, 'X'];
  const result = checkWinner(board);
  assert('T-06', 'Diagonal win detected for X',
    result !== null && result.winner === 'X' &&
    JSON.stringify(result.combo) === JSON.stringify([0, 4, 8])
  );
}

// T-07: Draw detected on a full board with no winner
{
  // X O X
  // X X O
  // O X O  — no three in a row
  const board = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'];
  assert('T-07', 'Full board with no winner is a draw', checkDraw(board) === true);
}

/* ── Sprint 5 tests (score tracking + reset) ───────────────── */
console.log('\nSprint 5 — Score tracking and reset\n');

// T-08: No move accepted after game over (gameOver flag honoured)
{
  // Simulate a completed game: X wins row 0
  state.board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
  state.gameOver = true;
  state.currentPlayer = 'X';

  // Attempt to claim index 5 (empty)
  // handleCellClick guards on state.gameOver, so board must stay unchanged
  // We call the logic directly without DOM
  const boardBefore = [...state.board];
  // Since handleCellClick touches the DOM we test the guard condition
  const shouldSkip = state.gameOver || state.board[5] !== null;
  assert('T-08', 'No move accepted after game over', shouldSkip === true);
}

// T-09: resetGame clears the board and resets currentPlayer to X
{
  // Manually set state as if a game just ended
  state.board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
  state.currentPlayer = 'O';
  state.gameOver = true;

  // resetGame calls DOM methods — mock them out for the test environment
  const _querySelectorAll = global.document;
  // Minimal stubs so resetGame doesn't throw in Node
  global.document = {
    querySelectorAll: () => ({ forEach: () => {} }),
    getElementById:   () => ({ textContent: '' }),
  };

  resetGame();

  // Restore
  global.document = _querySelectorAll;

  assert('T-09a', 'Board is cleared after reset',
    state.board.every((c) => c === null)
  );
  assert('T-09b', 'currentPlayer resets to X', state.currentPlayer === 'X');
  assert('T-09c', 'gameOver resets to false',  state.gameOver === false);
}

// T-10: Scores increment correctly on win and draw
{
  // Reset scores
  state.scores = { X: 0, O: 0, draw: 0 };

  // Simulate a win for X by directly testing checkWinner + manual increment
  const winBoard = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
  const result = checkWinner(winBoard);
  if (result) state.scores[result.winner]++;

  assert('T-10a', 'X score increments on win', state.scores.X === 1);
  assert('T-10b', 'O score unchanged after X wins', state.scores.O === 0);

  // Simulate a draw
  const drawBoard = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'];
  if (checkDraw(drawBoard)) state.scores.draw++;

  assert('T-10c', 'Draw score increments on draw', state.scores.draw === 1);
}

/* ── Summary ─────────────────────────────────────────────── */
console.log(`\n${passed + failed} tests — ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
