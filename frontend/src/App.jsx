import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getLast28Dates, computeDateStreak } from './utils/calculators';
import { COPY } from './i18n/translations';
import RestTimer from './components/RestTimer';
import OneRepMaxCalc from './components/OneRepMaxCalc';
import MacroCalculator from './components/MacroCalculator';

const VALID_TABS = ['home', 'training', 'nutrition', 'audio', 'plans', 'profile'];

const SCENES = [
  {
    id: 'chalk',
    tr: 'Magnezyum',
    en: 'Magnesium',
    quote: 'DISCIPLINE OVER MOTIVATION.',
    credit: 'Victor Freitas / Unsplash',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1280&q=75&fm=webp',
  },
  {
    id: '4am',
    tr: '04:00 AM',
    en: '04:00 AM',
    quote: 'BUILT IN THE DARK AT 04:00 AM.',
    credit: 'Risen Wang / Unsplash',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1280&q=75&fm=webp',
  },
  {
    id: 'focus',
    tr: 'Odak',
    en: 'Focus',
    quote: 'NOBODY CARES. WORK HARDER.',
    credit: 'Anastase Maragos / Unsplash',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1280&q=75&fm=webp',
  },
  {
    id: 'grit',
    tr: 'Azim',
    en: 'Grit',
    quote: 'THE IRON NEVER LIES TO YOU.',
    credit: 'Danielle Cerullo / Unsplash',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1280&q=75&fm=webp',
  },
];

const ACCENTS = [
  { id: 'white', label: 'Pure White', hex: '#ffffff' },
  { id: 'lime', label: 'Volt Lime', hex: '#c8ff00' },
  { id: 'ember', label: 'Ember Orange', hex: '#ff5500' },
  { id: 'ice', label: 'Ice Cyan', hex: '#38bdf8' },
  { id: 'crimson', label: 'Crimson', hex: '#f43f5e' },
];

const INITIAL_SPLITS = {
  push: [
    { id: 'p1', name: 'Incline Barbell Bench Press', sets: '4x8', weight: '80 kg' },
    { id: 'p2', name: 'Seated Dumbbell Shoulder Press', sets: '4x10', weight: '28 kg' },
    { id: 'p3', name: 'Cable Lateral Raise', sets: '4x15', weight: '12.5 kg' },
    { id: 'p4', name: 'Weighted Triceps Dips', sets: '3x12', weight: '+15 kg' },
  ],
  pull: [
    { id: 'pl1', name: 'Weighted Pull-Ups', sets: '4x8', weight: '+10 kg' },
    { id: 'pl2', name: 'Chest-Supported Row', sets: '4x10', weight: '75 kg' },
    { id: 'pl3', name: 'Face Pulls', sets: '4x15', weight: '25 kg' },
    { id: 'pl4', name: 'EZ-Bar Curl', sets: '3x12', weight: '37.5 kg' },
  ],
  legs: [
    { id: 'l1', name: 'High-Bar Back Squat', sets: '4x6', weight: '120 kg' },
    { id: 'l2', name: 'Romanian Deadlift', sets: '4x8', weight: '110 kg' },
    { id: 'l3', name: 'Bulgarian Split Squat', sets: '3x10', weight: '24 kg' },
    { id: 'l4', name: 'Standing Calf Raise', sets: '4x15', weight: '90 kg' },
  ],
};

const AUDIO_MODES = [
  { id: 'pulse130', title: '130 BPM Heavy Tempo Metronome & Sub-Bass', desc: 'Synthesized 130 BPM pulse for working sets', bpm: 130, freq: 110 },
  { id: 'pulse145', title: '145 BPM PR Attempt Drive', desc: 'High-cadence Web Audio rhythmic click + low drone', bpm: 145, freq: 130.81 },
  { id: 'drone', title: 'Deep Focus Binaural Drone (110 Hz)', desc: 'Continuous low-frequency concentration tone', bpm: 0, freq: 110 },
  { id: 'recovery', title: 'Post-Workout Recovery Tone (174 Hz)', desc: 'Calm sinusoidal down-regulation wave', bpm: 0, freq: 174 },
];

const SAMPLE_SCENARIOS = [
  {
    id: 's1',
    title: 'Sample Case A — Strength Progression',
    badge: 'ILLUSTRATIVE EXAMPLE',
    en: 'Example 12-week Upper/Lower progression model focusing on compound barbell lifts and RIR 1–2 tracking.',
    tr: 'Temel barbell hareketleri ve RIR 1–2 takibine odaklanan 12 haftalık örnek Alt/Üst vücut ilerleme kurgusu.',
  },
  {
    id: 's2',
    title: 'Sample Case B — Body Recomposition',
    badge: 'ILLUSTRATIVE EXAMPLE',
    en: 'Example moderate caloric deficit (-400 kcal) paired with 2.1g/kg protein and 4 weekly resistance sessions.',
    tr: 'Haftada 4 direnç antrenmanı ve 2.1g/kg protein ile eşleştirilmiş -400 kcal örnek rekompozisyon şablonu.',
  },
];

function getInitialTabFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  return VALID_TABS.includes(hash) ? hash : 'home';
}

export default function App() {
  const todayKey = new Date().toISOString().slice(0, 10);

  const [tab, setTab] = useState(getInitialTabFromHash);
  const [lang, setLang] = useLocalStorage('fitcore_lang', 'en');
  const [accent, setAccent] = useLocalStorage('fitcore_accent', 'white');
  const [sceneId, setSceneId] = useLocalStorage('fitcore_scene', 'chalk');

  const [splits, setSplits] = useLocalStorage('fitcore_splits_v3', INITIAL_SPLITS);
  const [completedByDate, setCompletedByDate] = useLocalStorage('fitcore_done_by_date', {});
  const [loggedDates, setLoggedDates] = useLocalStorage('fitcore_habit_dates', {});
  const [activeSplit, setActiveSplit] = useLocalStorage('fitcore_active_split', 'push');

  const [nutriProfile, setNutriProfile] = useLocalStorage('fitcore_nutri_profile', {
    sex: 'male',
    weightKg: 80,
    heightCm: 178,
    age: 28,
    activity: 1.55,
    goal: 'maintain',
  });
  const [waterByDate, setWaterByDate] = useLocalStorage('fitcore_water_by_date', {});
  const [localNotes, setLocalNotes] = useLocalStorage('fitcore_local_notes', []);
  const [athleteName, setAthleteName] = useLocalStorage('fitcore_athlete_name', 'Faruk Aydın');

  const [newName, setNewName] = useState('');
  const [newSets, setNewSets] = useState('4x10');
  const [newWeight, setNewWeight] = useState('70 kg');
  const [timerSignal, setTimerSignal] = useState(0);

  const [yearly, setYearly] = useState(false);
  const [consultModalPlan, setConsultModalPlan] = useState(null);
  const [clientGoalInput, setClientGoalInput] = useState('');
  const [noteName, setNoteName] = useState('');
  const [noteText, setNoteText] = useState('');

  // Web Audio synthesizer refs
  const [playingMode, setPlayingMode] = useState(null);
  const audioCtxRef = useRef(null);
  const pulseTimerRef = useRef(null);

  const t = COPY[lang] || COPY.en;
  const currentScene = SCENES.find((s) => s.id === sceneId) || SCENES[0];
  const todayCompletedMap = completedByDate[todayKey] || {};
  const waterCups = waterByDate[todayKey] || 0;

  // Sync <html lang>
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync URL hash for back/forward & shareable tabs
  useEffect(() => {
    const onHashChange = () => setTab(getInitialTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTab = (nextTab) => {
    window.location.hash = nextTab;
    setTab(nextTab);
  };

  // Clean up Web Audio on unmount
  useEffect(() => {
    return () => stopAudioEngine();
  }, []);

  const stopAudioEngine = () => {
    if (pulseTimerRef.current) {
      clearInterval(pulseTimerRef.current);
      pulseTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setPlayingMode(null);
  };

  const toggleAudioMode = (mode) => {
    if (playingMode === mode.id) {
      stopAudioEngine();
      return;
    }
    stopAudioEngine();
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(mode.freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      if (mode.bpm > 0) {
        const intervalMs = Math.round((60 / mode.bpm) * 1000);
        pulseTimerRef.current = setInterval(() => {
          if (!audioCtxRef.current) return;
          const now = audioCtxRef.current.currentTime;
          const clickOsc = audioCtxRef.current.createOscillator();
          const clickGain = audioCtxRef.current.createGain();
          clickOsc.type = 'triangle';
          clickOsc.frequency.setValueAtTime(440, now);
          clickGain.gain.setValueAtTime(0.09, now);
          clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          clickOsc.connect(clickGain);
          clickGain.connect(audioCtxRef.current.destination);
          clickOsc.start(now);
          clickOsc.stop(now + 0.08);
        }, intervalMs);
      }

      setPlayingMode(mode.id);
    } catch {
      setPlayingMode(null);
    }
  };

  // Pure state update — side effects kept strictly outside state updaters
  const toggleExercise = (exId) => {
    const wasDone = Boolean(todayCompletedMap[exId]);
    const nextDone = !wasDone;

    setCompletedByDate((prev) => ({
      ...prev,
      [todayKey]: {
        ...(prev[todayKey] || {}),
        [exId]: nextDone,
      },
    }));

    if (nextDone) {
      setTimerSignal((n) => n + 1);
      setLoggedDates((prev) => ({ ...prev, [todayKey]: true }));
    }
  };

  const resetTodayExercises = () => {
    setCompletedByDate((prev) => ({ ...prev, [todayKey]: {} }));
  };

  const addExercise = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const item = {
      id: String(Date.now()),
      name: newName.trim(),
      sets: newSets.trim() || '4x10',
      weight: newWeight.trim() || 'BW',
    };
    setSplits((prev) => ({
      ...prev,
      [activeSplit]: [...prev[activeSplit], item],
    }));
    setNewName('');
  };

  const handleWaterClick = (idx) => {
    const nextCount = waterCups === idx + 1 ? idx : idx + 1;
    setWaterByDate((prev) => ({ ...prev, [todayKey]: nextCount }));
  };

  const addLocalNote = (e) => {
    e.preventDefault();
    if (!noteName.trim() || !noteText.trim()) return;
    setLocalNotes((prev) => [
      {
        id: String(Date.now()),
        name: noteName.trim(),
        date: todayKey,
        text: noteText.trim(),
      },
      ...prev,
    ]);
    setNoteName('');
    setNoteText('');
  };

  const last28Dates = getLast28Dates(todayKey);
  const streak = computeDateStreak(loggedDates, todayKey);
  const activeHabitCount = last28Dates.filter((d) => loggedDates[d]).length;

  return (
    <div className="fc-shell" data-accent={accent}>
      <div className="fc-bg-layer" style={{ backgroundImage: `url("${currentScene.image}")` }} />
      <div className="fc-bg-vignette" />

      <div className="fc-content">
        <div className="fc-demo-strip">{t.demoBanner}</div>

        <header className="fc-nav">
          <div className="fc-brand" onClick={() => navigateTab('home')}>
            <span className="fc-brand-dot" />
            <span>FITCORE</span>
          </div>

          <nav className="fc-tabs">
            {VALID_TABS.map((key) => (
              <button
                key={key}
                type="button"
                className={`fc-tab ${tab === key ? 'active' : ''}`}
                onClick={() => navigateTab(key)}
              >
                {t.nav[key]}
              </button>
            ))}
          </nav>

          <div className="fc-controls">
            <div className="fc-color-dots" title="Accent Color">
              {ACCENTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`fc-dot-btn ${accent === c.id ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setAccent(c.id)}
                  aria-label={c.label}
                />
              ))}
            </div>

            <div className="fc-lang-switch">
              <button
                type="button"
                className={`fc-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`fc-lang-btn ${lang === 'tr' ? 'active' : ''}`}
                onClick={() => setLang('tr')}
              >
                TR
              </button>
            </div>
          </div>
        </header>

        <div className="fc-scene-bar">
          <span className="fc-quote-en">“{currentScene.quote}”</span>
          <div className="fc-scene-list">
            {SCENES.map((sc) => (
              <button
                key={sc.id}
                type="button"
                className={`fc-scene-chip ${sceneId === sc.id ? 'active' : ''}`}
                onClick={() => setSceneId(sc.id)}
              >
                {lang === 'tr' ? sc.tr : sc.en}
              </button>
            ))}
          </div>
        </div>

        {/* 1. HOME */}
        {tab === 'home' && (
          <>
            <section className="fc-hero-grid">
              <div className="fc-metrics-col">
                <div className="fc-card">
                  <div className="fc-card-head">
                    <span className="fc-card-title">{t.variedTitle}</span>
                    <span className="fc-badge">+25%</span>
                  </div>
                  <svg viewBox="0 0 320 92" width="100%" height="92" aria-label="Volume progression illustration">
                    <path d="M 10 66 Q 85 18, 165 50 T 310 24" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 10 38 Q 90 82, 170 48 T 310 68" fill="none" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <div className="fc-legend">
                    <span>● {t.progress}</span>
                    <span>● {t.oldHabits}</span>
                  </div>
                </div>

                <div className="fc-card">
                  <div className="fc-card-head">
                    <span className="fc-card-title">{t.intensityTitle}</span>
                    <span className="fc-badge">RPE 8–9</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                    <svg width="128" height="128" viewBox="0 0 136 136">
                      <circle cx="68" cy="68" r="54" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
                      <circle
                        cx="68"
                        cy="68"
                        r="54"
                        stroke="var(--accent)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="339.29"
                        strokeDashoffset={339.29 * 0.08}
                        strokeLinecap="round"
                        transform="rotate(-90 68 68)"
                      />
                      <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="25" fontWeight="800" fontFamily="JetBrains Mono, monospace">
                        92%
                      </text>
                    </svg>
                  </div>
                  <div className="fc-legend">
                    <span>{todayKey}</span>
                    <span style={{ color: 'var(--accent)' }}>{streak} {t.streakLbl}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="fc-kicker">{t.kicker}</div>
                <h1 className="fc-hero-title">
                  {t.heroTop}
                  <span className="highlight">{t.heroName}</span>
                </h1>
                <p className="fc-hero-desc">{t.heroDesc}</p>
                <div className="fc-cta-row">
                  <button type="button" className="fc-btn-primary" onClick={() => navigateTab('training')}>
                    {t.startBtn}
                  </button>
                  <button type="button" className="fc-btn-ghost" onClick={() => navigateTab('plans')}>
                    {t.plansBtn}
                  </button>
                </div>
              </div>
            </section>

            <div style={{ marginTop: 32 }}>
              <div className="fc-card-title" style={{ marginBottom: 12 }}>
                {t.galleryTitle}
              </div>
              <div className="fc-quote-cards">
                {SCENES.map((sc) => (
                  <div
                    key={sc.id}
                    className="fc-visual-card"
                    style={{ borderColor: sceneId === sc.id ? 'var(--accent)' : undefined }}
                    onClick={() => setSceneId(sc.id)}
                  >
                    <img src={sc.image} alt={sc.en} loading="lazy" />
                    <div className="fc-visual-card-content">
                      <div className="fc-visual-quote">“{sc.quote}”</div>
                      <div style={{ fontSize: 10, color: '#a1a1aa', marginTop: 4 }}>Photo: {sc.credit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 2. TRAINING & 1RM */}
        {tab === 'training' && (
          <section className="fc-grid-2">
            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.sessionTitle} ({todayKey})</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span className="fc-badge">
                    {splits[activeSplit].filter((i) => todayCompletedMap[i.id]).length} / {splits[activeSplit].length}
                  </span>
                  <button type="button" className="fc-scene-chip" onClick={resetTodayExercises}>
                    {t.resetDayBtn}
                  </button>
                </div>
              </div>

              <div className="fc-scene-list" style={{ marginBottom: 16 }}>
                {['push', 'pull', 'legs'].map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    className={`fc-scene-chip ${activeSplit === sp ? 'active' : ''}`}
                    onClick={() => setActiveSplit(sp)}
                  >
                    {t.splitNames[sp]}
                  </button>
                ))}
              </div>

              {splits[activeSplit].map((ex) => {
                const isDone = Boolean(todayCompletedMap[ex.id]);
                return (
                  <div key={ex.id} className={`fc-exercise-row ${isDone ? 'done' : ''}`}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{ex.name}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, color: 'var(--text-muted)' }}>{ex.sets}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, color: 'var(--text-muted)' }}>{ex.weight}</div>
                    <button type="button" className="fc-scene-chip active" onClick={() => toggleExercise(ex.id)}>
                      {isDone ? `✓ ${t.doneLabel}` : t.markLabel}
                    </button>
                  </div>
                );
              })}

              <form onSubmit={addExercise} style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr 0.6fr auto', gap: 8, marginTop: 14 }}>
                <input className="fc-input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.addPlaceholder} />
                <input className="fc-input" value={newSets} onChange={(e) => setNewSets(e.target.value)} />
                <input className="fc-input" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} />
                <button type="submit" className="fc-btn-primary" style={{ padding: '10px 16px' }}>
                  {t.addBtn}
                </button>
              </form>
            </div>

            <div>
              <RestTimer t={t} triggerSignal={timerSignal} />
              <OneRepMaxCalc t={t} />
            </div>
          </section>
        )}

        {/* 3. NUTRITION */}
        {tab === 'nutrition' && (
          <section className="fc-grid-2">
            <div>
              <MacroCalculator t={t} profile={nutriProfile} setProfile={setNutriProfile} />
              <div className="fc-card" style={{ marginTop: 18 }}>
                <div className="fc-card-title" style={{ marginBottom: 10 }}>
                  {t.mealsTitle}
                </div>
                <div className="fc-exercise-row">
                  <strong>01 // Oats, Whey Isolate &amp; Berries</strong>
                  <span>520 kcal</span>
                  <span>42g P</span>
                  <span className="fc-badge">MEAL 1</span>
                </div>
                <div className="fc-exercise-row">
                  <strong>02 // Chicken Breast, Jasmine Rice &amp; Olive Oil</strong>
                  <span>740 kcal</span>
                  <span>58g P</span>
                  <span className="fc-badge">MEAL 2</span>
                </div>
                <div className="fc-exercise-row">
                  <strong>03 // Lean Beef / Salmon, Potatoes &amp; Greens</strong>
                  <span>690 kcal</span>
                  <span>52g P</span>
                  <span className="fc-badge">MEAL 3</span>
                </div>
              </div>
            </div>

            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.waterTitle}</span>
                <span className="fc-badge">{(waterCups * 0.35).toFixed(2)} L / 3.50 L</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 14 }}>
                {Array.from({ length: 10 }, (_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`fc-matrix-cell ${idx < waterCups ? 'active' : ''}`}
                    onClick={() => handleWaterClick(idx)}
                  >
                    350ml
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="fc-scene-chip" onClick={() => setWaterByDate((p) => ({ ...p, [todayKey]: 0 }))}>
                  0.0 L RESET
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 4. SYNTHESIZED FOCUS AUDIO */}
        {tab === 'audio' && (
          <section className="fc-card">
            <div className="fc-card-head">
              <span className="fc-card-title">{t.playlistTitle}</span>
              <span className="fc-badge">{playingMode ? 'WEB AUDIO ACTIVE' : 'STANDBY'}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 0, marginBottom: 18 }}>{t.playlistSub}</p>

            {AUDIO_MODES.map((mode) => {
              const active = playingMode === mode.id;
              return (
                <div key={mode.id} className={`fc-track-row ${active ? 'playing' : ''}`} onClick={() => toggleAudioMode(mode)}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{mode.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {mode.desc} {mode.bpm ? `• ${mode.bpm} BPM` : `• ${mode.freq} Hz`}
                    </div>
                  </div>
                  <button type="button" className="fc-scene-chip active">
                    {active ? `■ ${t.pauseBtn}` : `▶ ${t.playBtn}`}
                  </button>
                </div>
              );
            })}
          </section>
        )}

        {/* 5. COACHING DEMO & LOCAL NOTES */}
        {tab === 'plans' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="fc-card-title">{t.plansTitle}</span>
              <div className="fc-lang-switch">
                <button type="button" className={`fc-lang-btn ${!yearly ? 'active' : ''}`} onClick={() => setYearly(false)}>
                  {t.billingMonthly}
                </button>
                <button type="button" className={`fc-lang-btn ${yearly ? 'active' : ''}`} onClick={() => setYearly(true)}>
                  {t.billingYearly}
                </button>
              </div>
            </div>

            <section className="fc-grid-3" style={{ marginBottom: 26 }}>
              {[
                {
                  id: 'Self-Guided Split (Demo)',
                  price: yearly ? '$15' : '$19',
                  perks: ['Structured Push/Pull/Legs Splits', 'Mifflin-St Jeor Macro Targets', '28-Day Real-Date Habit Log'],
                },
                {
                  id: 'Pro Hypertrophy (Demo)',
                  featured: true,
                  price: yearly ? '$39' : '$49',
                  perks: ['Progressive Overload Programming', '1RM & Barbell Plate Calculator', 'Bi-Weekly Check-In Workflow'],
                },
                {
                  id: '1-on-1 Coaching (Demo)',
                  price: yearly ? '$79' : '$99',
                  perks: ['Direct Consultation w/ Faruk Aydın', 'Custom Training Block Design', 'Technique & Recovery Review'],
                },
              ].map((plan) => (
                <div key={plan.id} className="fc-card" style={{ border: plan.featured ? '1.5px solid var(--accent)' : undefined }}>
                  <div className="fc-card-head">
                    <span className="fc-card-title">{plan.id}</span>
                    <span className="fc-badge">DEMO</span>
                  </div>
                  <div className="fc-price">
                    {plan.price}
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}> / mo (demo)</span>
                  </div>
                  <ul style={{ paddingLeft: 18, color: '#d4d4d8', fontSize: 13, lineHeight: 1.8 }}>
                    {plan.perks.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="fc-btn-primary"
                    style={{ width: '100%', marginTop: 12 }}
                    onClick={() => setConsultModalPlan(plan.id)}
                  >
                    {t.selectPlan}
                  </button>
                </div>
              ))}
            </section>

            <section className="fc-grid-2">
              <div className="fc-card">
                <div className="fc-card-head">
                  <span className="fc-card-title">{t.reviewsTitle}</span>
                  <span className="fc-badge">SAMPLE DATA</span>
                </div>
                {SAMPLE_SCENARIOS.map((s) => (
                  <div key={s.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <strong>{s.title}</strong>
                      <span className="fc-badge">{s.badge}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#d4d4d8', lineHeight: 1.55 }}>
                      {lang === 'tr' ? s.tr : s.en}
                    </div>
                  </div>
                ))}

                {localNotes.map((n) => (
                  <div key={n.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong>{n.name} • {n.date}</strong>
                      <span className="fc-badge">LOCAL BROWSER NOTE</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#d4d4d8' }}>{n.text}</div>
                  </div>
                ))}
              </div>

              <div className="fc-card">
                <div className="fc-card-title" style={{ marginBottom: 12 }}>
                  {t.notesTitle}
                </div>
                <form onSubmit={addLocalNote} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input className="fc-input" value={noteName} onChange={(e) => setNoteName(e.target.value)} placeholder={t.namePh} />
                  <textarea
                    className="fc-input"
                    style={{ borderRadius: 18, minHeight: 90, resize: 'vertical' }}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder={t.reviewPh}
                  />
                  <button type="submit" className="fc-btn-primary">
                    {t.submitReview}
                  </button>
                </form>
              </div>
            </section>
          </>
        )}

        {/* 6. PROFILE & REAL CALENDAR HABIT LOG */}
        {tab === 'profile' && (
          <section className="fc-grid-2">
            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.profileTitle}</span>
                <span className="fc-badge">{streak} {t.streakLbl}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 999,
                    background: 'var(--accent)',
                    color: 'var(--accent-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: 18,
                  }}
                >
                  FA
                </div>
                <input className="fc-input" value={athleteName} onChange={(e) => setAthleteName(e.target.value)} />
              </div>

              <div className="fc-card-title" style={{ marginBottom: 10 }}>
                {t.themeColorTitle}
              </div>
              <div className="fc-scene-list" style={{ marginBottom: 20 }}>
                {ACCENTS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`fc-scene-chip ${accent === c.id ? 'active' : ''}`}
                    onClick={() => setAccent(c.id)}
                  >
                    <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: 99, background: c.hex, marginRight: 6 }} />
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="fc-card-title" style={{ marginBottom: 10 }}>
                {t.bgSceneTitle}
              </div>
              <div className="fc-scene-list">
                {SCENES.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    className={`fc-scene-chip ${sceneId === sc.id ? 'active' : ''}`}
                    onClick={() => setSceneId(sc.id)}
                  >
                    {lang === 'tr' ? sc.tr : sc.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.matrixTitle}</span>
                <span className="fc-badge">{activeHabitCount} / 28</span>
              </div>
              <div className="fc-matrix">
                {last28Dates.map((dateStr) => {
                  const on = Boolean(loggedDates[dateStr]);
                  return (
                    <button
                      key={dateStr}
                      type="button"
                      title={dateStr}
                      className={`fc-matrix-cell ${on ? 'active' : ''}`}
                      onClick={() => setLoggedDates((prev) => ({ ...prev, [dateStr]: !prev[dateStr] }))}
                    >
                      {dateStr.slice(5)}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CONSULTATION MODAL (REAL CONTACT PATH) */}
        {consultModalPlan && (
          <div className="fc-modal-backdrop" onClick={() => setConsultModalPlan(null)}>
            <div className="fc-card" style={{ maxWidth: 460, width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <div className="fc-card-head">
                <span className="fc-card-title">{t.modalTitle}</span>
                <span className="fc-badge">{consultModalPlan}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.modalSub}</p>
              <input
                className="fc-input"
                style={{ marginBottom: 12 }}
                value={clientGoalInput}
                onChange={(e) => setClientGoalInput(e.target.value)}
                placeholder="Primary goal (e.g. Strength / Recomp / 3x week)"
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  className="fc-btn-primary"
                  style={{ textDecoration: 'none', textAlign: 'center', flex: 1 }}
                  href={`mailto:farukaydinn96@gmail.com?subject=${encodeURIComponent('FITCORE Consultation — ' + consultModalPlan)}&body=${encodeURIComponent('Selected Plan: ' + consultModalPlan + '\nGoal: ' + (clientGoalInput || 'General Strength'))}`}
                >
                  {t.sendEmailBtn}
                </a>
                <button type="button" className="fc-btn-ghost" onClick={() => setConsultModalPlan(null)}>
                  {t.closeBtn}
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="fc-footer">
          <span>FITCORE — Portfolio Project by Faruk Aydın (github.com/farukaydinn96-commits)</span>
          <span>Background photography via Unsplash ({currentScene.credit})</span>
        </footer>
      </div>
    </div>
  );
}
