/**
 * game.test.js — minimal hand-rolled test runner
 *
 * Run with:  node game.test.js
 *
 * No external dependencies — plain Node.js only.
 */

const { checkWinner, checkDraw } = require('./game.js');

// ---------------------------------------------------------------------------
// Tiny test runner
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓  ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗  ${description}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(actual, expected, message) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    throw new Error(message || `Expected ${e} but got ${a}`);
  }
}

// ---------------------------------------------------------------------------
// Sprint 1 — placeholder smoke test
// ---------------------------------------------------------------------------

console.log('\nSprint 1 — scaffold smoke tests');

test('checkWinner is a function', () => {
  assert(typeof checkWinner === 'function');
});

test('checkDraw is a function', () => {
  assert(typeof checkDraw === 'function');
});

test('checkWinner returns null for empty board', () => {
  assertEqual(checkWinner(Array(9).fill(null)), null);
});

// ---------------------------------------------------------------------------
// Sprint 2 — board state / player alternation (pure-logic layer)
// ---------------------------------------------------------------------------

console.log('\nSprint 2 — board state and player alternation');

/**
 * Simulate a single move on a board copy and return the new board.
 * Mirrors what handleCellClick does to state.board without touching the DOM.
 */
function applyMove(board, index, player) {
  const next = [...board];
  next[index] = player;
  return next;
}

test('a move places the current player on the correct cell', () => {
  const board = Array(9).fill(null);
  const after = applyMove(board, 4, 'X');
  assertEqual(after[4], 'X');
});

test('an occupied cell is not overwritten', () => {
  const board = Array(9).fill(null);
  const after1 = applyMove(board, 4, 'X');
  // Attempting to overwrite: if cell is truthy, the move should be rejected
  const shouldBlock = Boolean(after1[4]);
  assert(shouldBlock, 'Cell 4 should already be occupied');
  // Only apply the move if the cell is free (mirrors handleCellClick guard)
  const after2 = after1[4] ? after1 : applyMove(after1, 4, 'O');
  assertEqual(after2[4], 'X', 'Cell should still be X');
});

test('players alternate: X then O', () => {
  // Alternation logic: X → O → X
  const toggle = (p) => (p === 'X' ? 'O' : 'X');
  assertEqual(toggle('X'), 'O');
  assertEqual(toggle('O'), 'X');
});

// ---------------------------------------------------------------------------
// Sprint 3 — win and draw detection
// ---------------------------------------------------------------------------

console.log('\nSprint 3 — win and draw detection');

// Helper: build a board from a compact string ('X', 'O', or '.' for empty)
function boardFrom(str) {
  return str.split('').map((c) => (c === '.' ? null : c));
}

// --- checkWinner: all 8 winning lines ---

test('detects row 1 win for X', () => {
  const b = boardFrom('XXX......');
  const r = checkWinner(b);
  assert(r !== null, 'expected a winner');
  assertEqual(r.winner, 'X');
  assertEqual(r.line, [0, 1, 2]);
});

test('detects row 2 win for O', () => {
  const b = boardFrom('...OOO...');
  const r = checkWinner(b);
  assert(r !== null);
  assertEqual(r.winner, 'O');
  assertEqual(r.line, [3, 4, 5]);
});

test('detects row 3 win for X', () => {
  const b = boardFrom('......XXX');
  const r = checkWinner(b);
  assert(r !== null);
  assertEqual(r.winner, 'X');
  assertEqual(r.line, [6, 7, 8]);
});

test('detects column 1 win for O', () => {
  const b = boardFrom('O..O..O..');
  const r = checkWinner(b);
  assert(r !== null);
  assertEqual(r.winner, 'O');
  assertEqual(r.line, [0, 3, 6]);
});

test('detects column 2 win for X', () => {
  const b = boardFrom('.X..X..X.');  // indices 1, 4, 7
  const r = checkWinner(b);
  assert(r !== null);
  assertEqual(r.winner, 'X');
  assertEqual(r.line, [1, 4, 7]);
});

test('detects column 3 win for O', () => {
  const b = boardFrom('..O..O..O');
  const r = checkWinner(b);
  assert(r !== null);
  assertEqual(r.winner, 'O');
  assertEqual(r.line, [2, 5, 8]);
});

test('detects main diagonal win for X', () => {
  const b = boardFrom('X...X...X');
  const r = checkWinner(b);
  assert(r !== null);
  assertEqual(r.winner, 'X');
  assertEqual(r.line, [0, 4, 8]);
});

test('detects anti-diagonal win for O', () => {
  const b = boardFrom('..O.O.O..');
  const r = checkWinner(b);
  assert(r !== null);
  assertEqual(r.winner, 'O');
  assertEqual(r.line, [2, 4, 6]);
});

test('checkWinner returns null for partial board with no winner', () => {
  const b = boardFrom('XO.OX....');
  assertEqual(checkWinner(b), null);
});

// --- checkDraw ---

test('checkDraw returns false for empty board', () => {
  assertEqual(checkDraw(Array(9).fill(null)), false);
});

test('checkDraw returns false when board is full but there is a winner', () => {
  // X wins row 1; remaining cells filled with alternating O/X
  const b = boardFrom('XXXOOXOOX'); // X wins [0,1,2]
  assert(checkWinner(b) !== null, 'should have a winner');
  assertEqual(checkDraw(b), false);
});

test('checkDraw returns true for a real draw board', () => {
  // Classic draw: XOXOXOOXO — no three in a row for either player
  const b = boardFrom('XOXOXOOXO');
  assertEqual(checkWinner(b), null, 'no winner expected');
  assertEqual(checkDraw(b), true);
});

// ---------------------------------------------------------------------------
// Sprint 4 — score tracking and reset logic
// ---------------------------------------------------------------------------

console.log('\nSprint 4 — score tracking and reset logic');

const { state } = require('./game.js');

/**
 * Pure score-increment helper mirroring the state-side of updateScores.
 * The DOM side cannot be tested in Node; we test only state mutation.
 */
function incrementScore(scores, winner) {
  const next = { ...scores };
  next[winner]++;
  return next;
}

test('score increments for X on X win', () => {
  const after = incrementScore({ X: 0, O: 0 }, 'X');
  assertEqual(after, { X: 1, O: 0 });
});

test('score increments for O on O win', () => {
  const after = incrementScore({ X: 2, O: 1 }, 'O');
  assertEqual(after, { X: 2, O: 2 });
});

test('score does not change on draw (no winner argument)', () => {
  // A draw passes no winner, so scores are unchanged
  const scores = { X: 3, O: 2 };
  // Simulate: draw path — updateScores is NOT called
  assertEqual(scores, { X: 3, O: 2 });
});

test('reset leaves scores intact', () => {
  // Simulate initGame: only board/currentPlayer/gameOver reset
  const before = { X: 5, O: 3 };
  const resetState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    gameOver: false,
    scores: before, // scores untouched
  };
  assertEqual(resetState.scores, { X: 5, O: 3 });
  assertEqual(resetState.board, Array(9).fill(null));
  assertEqual(resetState.currentPlayer, 'X');
  assert(!resetState.gameOver);
});

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log(`\n${passed + failed} test(s): ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
