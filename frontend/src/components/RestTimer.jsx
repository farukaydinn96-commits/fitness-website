import React, { useState, useEffect } from 'react';

function playCompletionBeep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch {
    // Ignore audio context restriction if unmuted without gesture
  }
}

export default function RestTimer({ t, triggerSignal }) {
  const [endTime, setEndTime] = useState(null);
  const [remaining, setRemaining] = useState(90);

  useEffect(() => {
    if (triggerSignal > 0) {
      setEndTime(Date.now() + 90 * 1000);
      setRemaining(90);
    }
  }, [triggerSignal]);

  useEffect(() => {
    if (!endTime) return undefined;
    const tick = () => {
      const diff = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setRemaining(diff);
      if (diff <= 0) {
        setEndTime(null);
        playCompletionBeep();
      }
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [endTime]);

  const startPreset = (secs) => {
    setEndTime(Date.now() + secs * 1000);
    setRemaining(secs);
  };

  const formatTimer = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  return (
    <div className="fc-card">
      <div className="fc-card-head">
        <span className="fc-card-title">{t.timerTitle}</span>
        <span className="fc-badge">{endTime ? 'LIVE' : 'READY'}</span>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 0 }}>{t.timerSub}</p>
      <div className="fc-timer-num">{formatTimer(remaining)}</div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button type="button" className="fc-scene-chip active" onClick={() => startPreset(90)}>
          90s
        </button>
        <button type="button" className="fc-scene-chip" onClick={() => startPreset(60)}>
          60s
        </button>
        <button type="button" className="fc-scene-chip" onClick={() => startPreset(120)}>
          120s
        </button>
        <button
          type="button"
          className="fc-scene-chip"
          onClick={() => {
            setEndTime(null);
            setRemaining(90);
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
}
