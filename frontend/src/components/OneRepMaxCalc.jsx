import React, { useState } from 'react';
import { calculateOneRepMax, calculatePlatesPerSide, clampNumber } from '../utils/calculators';

export default function OneRepMaxCalc({ t }) {
  const [weightInput, setWeightInput] = useState('100');
  const [repsInput, setRepsInput] = useState('5');

  const safeWeight = clampNumber(weightInput, 20, 400, 100);
  const safeReps = clampNumber(repsInput, 1, 20, 5);
  const stats = calculateOneRepMax(safeWeight, safeReps);
  const plates = calculatePlatesPerSide(safeWeight, 20);

  return (
    <div className="fc-card" style={{ marginTop: 18 }}>
      <div className="fc-card-head">
        <span className="fc-card-title">{t.oneRmTitle}</span>
        <span className="fc-badge">EPLEY FORMULA</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div>
          <label className="fc-label">{t.liftWeightLbl}</label>
          <input
            type="text"
            inputMode="decimal"
            className="fc-input"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            onBlur={() => setWeightInput(String(clampNumber(weightInput, 20, 400, 100)))}
          />
        </div>
        <div>
          <label className="fc-label">{t.liftRepsLbl}</label>
          <input
            type="text"
            inputMode="numeric"
            className="fc-input"
            value={repsInput}
            onChange={(e) => setRepsInput(e.target.value)}
            onBlur={() => setRepsInput(String(Math.round(clampNumber(repsInput, 1, 20, 5))))}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
        <div className="fc-macro-box">
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.estOneRm}</div>
          <div className="fc-macro-val">{stats.oneRm}</div>
          <div style={{ fontSize: 11 }}>kg</div>
        </div>
        <div className="fc-macro-box">
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>85% (HYPERTROPHY)</div>
          <div className="fc-macro-val">{stats.eightyFive}</div>
          <div style={{ fontSize: 11 }}>kg</div>
        </div>
        <div className="fc-macro-box">
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>75% (VOLUME)</div>
          <div className="fc-macro-val">{stats.seventyFive}</div>
          <div style={{ fontSize: 11 }}>kg</div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{t.platesPerSideLbl}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {plates.length === 0 ? (
          <span className="fc-badge">EMPTY 20KG BAR</span>
        ) : (
          plates.map((p, idx) => (
            <span key={idx} className="fc-badge">
              {p} kg
            </span>
          ))
        )}
      </div>
    </div>
  );
}
