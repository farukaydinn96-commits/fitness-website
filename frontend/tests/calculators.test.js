import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMifflinMacros,
  calculateOneRepMax,
  calculatePlatesPerSide,
  computeDateStreak,
} from '../src/utils/calculators.js';

test('Mifflin-St Jeor clamps extreme low inputs and never returns negative calories', () => {
  const res = calculateMifflinMacros({ sex: 'male', weightKg: 5, heightCm: 100, age: 10, activity: 1.2, goal: 'cut' });
  assert.ok(res.targetKcal >= 1500);
  assert.ok(res.proteinG > 0 && res.carbsG > 0 && res.fatsG > 0);
});

test('OneRepMax Epley calculation and plate loader math are accurate', () => {
  const rm = calculateOneRepMax(100, 5);
  assert.equal(rm.oneRm, 116.7);
  const plates = calculatePlatesPerSide(100, 20);
  assert.deepEqual(plates, [25, 15]);
});

test('Date streak counts consecutive real dates accurately', () => {
  const map = { '2026-11-20': true, '2026-11-21': true, '2026-11-22': true };
  assert.equal(computeDateStreak(map, '2026-11-22'), 3);
});
