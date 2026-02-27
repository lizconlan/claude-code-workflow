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
// Summary
// ---------------------------------------------------------------------------

console.log(`\n${passed + failed} test(s): ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
