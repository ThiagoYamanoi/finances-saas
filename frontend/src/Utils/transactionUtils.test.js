import assert from 'node:assert/strict';
import test from 'node:test';

import {
  matchesPeriod,
  parseTransactionDate,
} from './transactionUtils.js';

test('parseTransactionDate parses date-only values in local time', () => {
  const parsed = parseTransactionDate('2024-03-09');

  assert.equal(parsed.getFullYear(), 2024);
  assert.equal(parsed.getMonth(), 2);
  assert.equal(parsed.getDate(), 9);
});

test('parseTransactionDate parses timestamp values', () => {
  const parsed = parseTransactionDate('2024-03-09T12:30:00.000Z');

  assert.equal(parsed.toISOString(), '2024-03-09T12:30:00.000Z');
});

test('matchesPeriod includes every transaction for the all period', () => {
  assert.equal(matchesPeriod(new Date('2000-01-01'), 'all'), true);
});