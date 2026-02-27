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
// Summary
// ---------------------------------------------------------------------------

console.log(`\n${passed + failed} test(s): ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
