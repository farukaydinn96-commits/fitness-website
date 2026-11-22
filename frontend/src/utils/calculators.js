export function clampNumber(val, min, max, fallback) {
  const num = Number(val);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

export function calculateMifflinMacros({ sex = 'male', weightKg = 80, heightCm = 178, age = 28, activity = 1.55, goal = 'maintain' }) {
  const w = clampNumber(weightKg, 35, 220, 80);
  const h = clampNumber(heightCm, 130, 230, 178);
  const a = clampNumber(age, 16, 90, 28);
  const act = clampNumber(activity, 1.2, 1.9, 1.55);

  const sexOffset = sex === 'female' ? -161 : 5;
  const bmr = Math.round(10 * w + 6.25 * h - 5 * a + sexOffset);
  const tdee = Math.round(bmr * act);

  const delta = goal === 'cut' ? -400 : goal === 'bulk' ? 300 : 0;
  const minSafeKcal = sex === 'female' ? 1200 : 1500;
  const targetKcal = Math.max(minSafeKcal, tdee + delta);

  const proteinG = Math.round(w * (goal === 'cut' ? 2.2 : 2.0));
  const fatsG = Math.max(40, Math.round(w * 0.85));
  const remainingKcal = Math.max(200, targetKcal - proteinG * 4 - fatsG * 9);
  const carbsG = Math.round(remainingKcal / 4);

  return { bmr, tdee, targetKcal, proteinG, carbsG, fatsG };
}

export function calculateOneRepMax(weightKg, reps) {
  const w = clampNumber(weightKg, 1, 500, 80);
  const r = Math.round(clampNumber(reps, 1, 20, 5));
  if (r === 1) return { oneRm: w, eightyFive: Math.round(w * 0.85), seventyFive: Math.round(w * 0.75) };
  const epley = w * (1 + r / 30);
  const oneRm = Math.round(epley * 10) / 10;
  return {
    oneRm,
    eightyFive: Math.round(oneRm * 0.85 * 2) / 2,
    seventyFive: Math.round(oneRm * 0.75 * 2) / 2,
  };
}

export function calculatePlatesPerSide(targetWeightKg, barWeightKg = 20) {
  const total = clampNumber(targetWeightKg, barWeightKg, 500, barWeightKg);
  let perSide = (total - barWeightKg) / 2;
  const denominations = [25, 20, 15, 10, 5, 2.5, 1.25];
  const plates = [];

  for (const plate of denominations) {
    while (perSide >= plate - 0.001) {
      plates.push(plate);
      perSide = Math.round((perSide - plate) * 100) / 100;
    }
  }
  return plates;
}

export function getLast28Dates(todayStr) {
  const base = todayStr ? new Date(todayStr + 'T12:00:00Z') : new Date();
  const dates = [];
  for (let i = 27; i >= 0; i -= 1) {
    const d = new Date(base);
    d.setUTCDate(base.getUTCDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export function computeDateStreak(loggedDatesMap, todayStr) {
  const dates = getLast28Dates(todayStr);
  let streak = 0;
  for (let i = dates.length - 1; i >= 0; i -= 1) {
    const key = dates[i];
    if (loggedDatesMap && loggedDatesMap[key]) {
      streak += 1;
    } else if (i === dates.length - 1) {
      continue;
    } else {
      break;
    }
  }
  return streak;
}
