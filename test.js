/* ============================================================
   test.js — Pure logic unit tests (no DOM, runs in Node.js)
   Usage: node test.js
   ============================================================ */
const { checkWinner, checkDraw } = require('./app.js');

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

/* ── Sprint 5 tests (score/reset — added in Sprint 5) ──────── */
// T-08 through T-10 are appended here after Sprint 5 implementation.

/* ── Summary ─────────────────────────────────────────────── */
console.log(`\n${passed + failed} tests — ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
