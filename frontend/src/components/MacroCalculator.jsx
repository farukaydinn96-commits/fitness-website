import React, { useState } from 'react';
import { calculateMifflinMacros, clampNumber } from '../utils/calculators';

export default function MacroCalculator({ t, profile, setProfile }) {
  const [weightStr, setWeightStr] = useState(String(profile.weightKg));
  const [heightStr, setHeightStr] = useState(String(profile.heightCm));
  const [ageStr, setAgeStr] = useState(String(profile.age));

  const commitField = (field, raw, min, max, fallback) => {
    const clean = clampNumber(raw, min, max, fallback);
    setProfile((prev) => ({ ...prev, [field]: clean }));
    return String(clean);
  };

  const macros = calculateMifflinMacros(profile);

  return (
    <div className="fc-card">
      <div className="fc-card-head">
        <span className="fc-card-title">{t.nutriTitle}</span>
        <span className="fc-badge">TDEE {macros.tdee} KCAL</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 12 }}>
        <div>
          <label className="fc-label">{t.sexLbl}</label>
          <div className="fc-scene-list">
            {['male', 'female'].map((sx) => (
              <button
                key={sx}
                type="button"
                className={`fc-scene-chip ${profile.sex === sx ? 'active' : ''}`}
                onClick={() => setProfile((p) => ({ ...p, sex: sx }))}
              >
                {t[sx]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="fc-label">{t.goalLbl}</label>
          <div className="fc-scene-list">
            {['cut', 'maintain', 'bulk'].map((g) => (
              <button
                key={g}
                type="button"
                className={`fc-scene-chip ${profile.goal === g ? 'active' : ''}`}
                onClick={() => setProfile((p) => ({ ...p, goal: g }))}
              >
                {t.goals[g]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        <div>
          <label className="fc-label">{t.weightLbl}</label>
          <input
            type="text"
            inputMode="decimal"
            className="fc-input"
            value={weightStr}
            onChange={(e) => setWeightStr(e.target.value)}
            onBlur={() => setWeightStr(commitField('weightKg', weightStr, 35, 220, 80))}
          />
        </div>
        <div>
          <label className="fc-label">{t.heightLbl}</label>
          <input
            type="text"
            inputMode="numeric"
            className="fc-input"
            value={heightStr}
            onChange={(e) => setHeightStr(e.target.value)}
            onBlur={() => setHeightStr(commitField('heightCm', heightStr, 130, 230, 178))}
          />
        </div>
        <div>
          <label className="fc-label">{t.ageLbl}</label>
          <input
            type="text"
            inputMode="numeric"
            className="fc-input"
            value={ageStr}
            onChange={(e) => setAgeStr(e.target.value)}
            onBlur={() => setAgeStr(commitField('age', ageStr, 16, 90, 28))}
          />
        </div>
        <div>
          <label className="fc-label">{t.activityLbl}</label>
          <select
            className="fc-input"
            value={String(profile.activity)}
            onChange={(e) => setProfile((p) => ({ ...p, activity: Number(e.target.value) }))}
          >
            {Object.entries(t.activities).map(([val, label]) => (
              <option key={val} value={val} style={{ background: '#111', color: '#fff' }}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        <div className="fc-macro-box">
          <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{t.kcalLbl}</div>
          <div className="fc-macro-val">{macros.targetKcal}</div>
          <div style={{ fontSize: 11 }}>kcal</div>
        </div>
        <div className="fc-macro-box">
          <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{t.proteinLbl}</div>
          <div className="fc-macro-val">{macros.proteinG}g</div>
          <div style={{ fontSize: 11 }}>Protein</div>
        </div>
        <div className="fc-macro-box">
          <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{t.carbsLbl}</div>
          <div className="fc-macro-val">{macros.carbsG}g</div>
          <div style={{ fontSize: 11 }}>Carbs</div>
        </div>
        <div className="fc-macro-box">
          <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{t.fatsLbl}</div>
          <div className="fc-macro-val">{macros.fatsG}g</div>
          <div style={{ fontSize: 11 }}>Fats</div>
        </div>
      </div>

      <p style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 14, marginBottom: 0 }}>
        * {t.disclaimer}
      </p>
    </div>
  );
}
