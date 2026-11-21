import React, { useState, useEffect } from 'react';
import './App.css';

const SCENES = [
  {
    id: 'chalk',
    tr: 'Magnezyum',
    en: 'Magnesium',
    local: './bg/bg-chalk.jpg',
    remote: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: '4am',
    tr: '04:00 AM',
    en: '04:00 AM',
    local: './bg/bg-4am.jpg',
    remote: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 'focus',
    tr: 'Odak',
    en: 'Focus',
    local: './bg/bg-focus.jpg',
    remote: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 'grit',
    tr: 'Azim',
    en: 'Grit',
    local: './bg/bg-grit.jpg',
    remote: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=85',
  },
];

const INITIAL_SPLITS = {
  push: [
    { id: 'p1', name: 'Incline Barbell Bench Press', sets: '4x8', weight: '80 kg', done: true },
    { id: 'p2', name: 'Seated Dumbbell Shoulder Press', sets: '4x10', weight: '28 kg', done: true },
    { id: 'p3', name: 'Cable Lateral Raise', sets: '4x15', weight: '12.5 kg', done: false },
    { id: 'p4', name: 'Weighted Triceps Dips', sets: '3x12', weight: '+15 kg', done: false },
  ],
  pull: [
    { id: 'pl1', name: 'Weighted Pull-Ups', sets: '4x8', weight: '+10 kg', done: true },
    { id: 'pl2', name: 'Chest-Supported Row', sets: '4x10', weight: '75 kg', done: false },
    { id: 'pl3', name: 'Face Pulls', sets: '4x15', weight: '25 kg', done: false },
    { id: 'pl4', name: 'EZ-Bar Curl', sets: '3x12', weight: '37.5 kg', done: false },
  ],
  legs: [
    { id: 'l1', name: 'High-Bar Back Squat', sets: '4x6', weight: '120 kg', done: true },
    { id: 'l2', name: 'Romanian Deadlift', sets: '4x8', weight: '110 kg', done: false },
    { id: 'l3', name: 'Bulgarian Split Squat', sets: '3x10', weight: '24 kg', done: false },
    { id: 'l4', name: 'Standing Calf Raise', sets: '4x15', weight: '90 kg', done: false },
  ],
};

const COPY = {
  en: {
    tabs: { home: 'HOME', training: 'TRAINING', dashboard: 'DASHBOARD' },
    sceneLabel: 'GYMNOTE ATMOSPHERE',
    kicker: 'OLED DARK COACHING SYSTEM • EST. 2026',
    heroTop: 'PERSONAL TRAINING WITH',
    heroName: 'FARUK AYDIN',
    heroDesc:
      'Unlock your full potential with discipline-first strength programming, shift-style workout logging, and progressive overload tracking engineered for serious lifters.',
    startBtn: 'START WORKOUT',
    dashBtn: 'DISCIPLINE MATRIX',
    variedTitle: 'VARIED TRAINING',
    progress: 'PROGRESS',
    oldHabits: 'OLD HABITS',
    intensityTitle: 'TRAINING INTENSITY',
    pillars: [
      { num: '04:00', label: 'Zero-distraction OLED focus interface inspired by GYMNOTE' },
      { num: '100%', label: 'Progressive overload & rest-timer synchronized sessions' },
      { num: '28-DAY', label: 'Visual discipline matrix to lock in training consistency' },
    ],
    splitNames: { push: 'PUSH DAY', pull: 'PULL DAY', legs: 'LEG DAY' },
    sessionTitle: 'SHIFT-STYLE WORKOUT LOG',
    addPlaceholder: 'Exercise name (e.g. Bench Press)',
    setsPlaceholder: '4x10',
    weightPlaceholder: '80 kg',
    addBtn: '+ ADD',
    doneLabel: 'LOGGED',
    markLabel: 'COMPLETE',
    timerTitle: 'AUTO REST TIMER',
    timerSub: 'Triggers 90s recovery automatically when you complete a set.',
    start90: '90s REST',
    start60: '60s REST',
    reset: 'RESET',
    streakCard: 'ACTIVE STREAK',
    completedCard: 'COMPLETED BLOCKS',
    consistencyCard: '28-DAY CONSISTENCY',
    matrixTitle: '28-DAY DISCIPLINE MATRIX (CLICK ANY DAY TO TOGGLE)',
    daysSuffix: 'DAYS',
  },
  tr: {
    tabs: { home: 'ANA SAYFA', training: 'ANTRENMAN', dashboard: 'PANEL' },
    sceneLabel: 'GYMNOTE ATMOSFER SAHNESİ',
    kicker: 'OLED KARANLIK KOÇLUK SİSTEMİ • 2026',
    heroTop: 'BİREBİR ANTRENMAN & KOÇLUK',
    heroName: 'FARUK AYDIN',
    heroDesc:
      'Hedeflerine özel tasarlanmış progresif güç programlaması, GYMNOTE vardiya tipi antrenman kaydı ve disiplin matrisi ile gerçek potansiyelini ortaya çıkar.',
    startBtn: 'ANTRENMANA BAŞLA',
    dashBtn: 'DİSİPLİN MATRİSİ',
    variedTitle: 'ÇEŞİTLENDİRİLMİŞ ANTRENMAN',
    progress: 'GELİŞİM',
    oldHabits: 'ESKİ ALIŞKANLIK',
    intensityTitle: 'ANTRENMAN YOĞUNLUĞU',
    pillars: [
      { num: '04:00', label: 'GYMNOTE ilhamlı dikkat dağıtmayan saf OLED siyah arayüz' },
      { num: '%100', label: 'Otomatik dinlenme sayacı ve set bazlı ağırlık takibi' },
      { num: '28 GÜN', label: 'Antrenman sürekliliğini koruyan görsel disiplin matrisi' },
    ],
    splitNames: { push: 'İTİŞ (PUSH)', pull: 'ÇEKİŞ (PULL)', legs: 'BACAK (LEGS)' },
    sessionTitle: 'VARDİYA TİPİ ANTRENMAN KAYDI',
    addPlaceholder: 'Hareket adı (örn. Bench Press)',
    setsPlaceholder: '4x10',
    weightPlaceholder: '80 kg',
    addBtn: '+ EKLE',
    doneLabel: 'TAMAM',
    markLabel: 'BİTİR',
    timerTitle: 'OTOMATİK DİNLENME SAYACI',
    timerSub: 'Bir hareketi tamamladığında otomatik 90 sn dinlenme başlatır.',
    start90: '90sn DİNLEN',
    start60: '60sn DİNLEN',
    reset: 'SIFIRLA',
    streakCard: 'AKTİF SERİ',
    completedCard: 'TAMAMLANAN HAREKET',
    consistencyCard: '28 GÜNLÜK İSTİKRAR',
    matrixTitle: '28 GÜNLÜK DİSİPLİN MATRİSİ (GÜNLERE TIKLAYARAK İŞARETLE)',
    daysSuffix: 'GÜN',
  },
};

const DEFAULT_MATRIX = Array.from({ length: 28 }, (_, idx) =>
  [0, 1, 2, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 19, 20, 21, 23, 24, 25, 26, 27].includes(idx)
);

export default function App() {
  const [tab, setTab] = useState('home');
  const [lang, setLang] = useState(() => localStorage.getItem('fc_lang') || 'en');
  const [accent, setAccent] = useState(() => localStorage.getItem('fc_accent') || 'lime');
  const [sceneId, setSceneId] = useState(() => localStorage.getItem('fc_scene') || 'focus');
  const [splits, setSplits] = useState(() => {
    try {
      const saved = localStorage.getItem('fc_splits');
      return saved ? JSON.parse(saved) : INITIAL_SPLITS;
    } catch {
      return INITIAL_SPLITS;
    }
  });
  const [activeSplit, setActiveSplit] = useState('push');
  const [matrix, setMatrix] = useState(() => {
    try {
      const saved = localStorage.getItem('fc_matrix');
      return saved ? JSON.parse(saved) : DEFAULT_MATRIX;
    } catch {
      return DEFAULT_MATRIX;
    }
  });

  const [newName, setNewName] = useState('');
  const [newSets, setNewSets] = useState('4x10');
  const [newWeight, setNewWeight] = useState('60 kg');
  const [restSeconds, setRestSeconds] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);

  const t = COPY[lang];
  const currentScene = SCENES.find((s) => s.id === sceneId) || SCENES[2];

  useEffect(() => {
    localStorage.setItem('fc_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('fc_accent', accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem('fc_scene', sceneId);
  }, [sceneId]);

  useEffect(() => {
    localStorage.setItem('fc_splits', JSON.stringify(splits));
  }, [splits]);

  useEffect(() => {
    localStorage.setItem('fc_matrix', JSON.stringify(matrix));
  }, [matrix]);

  useEffect(() => {
    if (!timerRunning) return undefined;
    const id = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const toggleExercise = (id) => {
    setSplits((prev) => {
      const updated = prev[activeSplit].map((item) => {
        if (item.id === id) {
          const nextDone = !item.done;
          if (nextDone) {
            setRestSeconds(90);
            setTimerRunning(true);
          }
          return { ...item, done: nextDone };
        }
        return item;
      });
      return { ...prev, [activeSplit]: updated };
    });
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const entry = {
      id: String(Date.now()),
      name: newName.trim(),
      sets: newSets.trim() || '4x10',
      weight: newWeight.trim() || 'BW',
      done: false,
    };
    setSplits((prev) => ({
      ...prev,
      [activeSplit]: [...prev[activeSplit], entry],
    }));
    setNewName('');
  };

  const toggleMatrixDay = (index) => {
    setMatrix((prev) => prev.map((val, idx) => (idx === index ? !val : val)));
  };

  const allExercises = Object.values(splits).flat();
  const completedCount = allExercises.filter((x) => x.done).length;
  const activeDaysCount = matrix.filter(Boolean).length;
  const consistencyPct = Math.round((activeDaysCount / matrix.length) * 100);

  let currentStreak = 0;
  for (let i = matrix.length - 1; i >= 0; i -= 1) {
    if (matrix[i]) currentStreak += 1;
    else break;
  }

  const formatTimer = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fc-shell" data-accent={accent}>
      <div
        className="fc-bg-layer"
        style={{
          backgroundImage: `url("${currentScene.local}"), url("${currentScene.remote}")`,
        }}
      />
      <div className="fc-bg-vignette" />

      <div className="fc-content">
        {/* NAVBAR */}
        <header className="fc-nav">
          <div className="fc-brand" onClick={() => setTab('home')}>
            <span className="fc-brand-dot" />
            <span>
              <span className="accent">FIT</span>CORE
            </span>
          </div>

          <nav className="fc-tabs">
            {['home', 'training', 'dashboard'].map((key) => (
              <button
                key={key}
                type="button"
                className={`fc-tab ${tab === key ? 'active' : ''}`}
                onClick={() => setTab(key)}
              >
                {t.tabs[key]}
              </button>
            ))}
          </nav>

          <div className="fc-controls">
            <button
              type="button"
              className="fc-pill-btn"
              onClick={() => setAccent((a) => (a === 'lime' ? 'ember' : 'lime'))}
              title="Switch Accent"
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 99,
                  background: accent === 'lime' ? '#c8ff00' : '#ff5500',
                }}
              />
              {accent === 'lime' ? 'LIME' : 'EMBER'}
            </button>
            <button
              type="button"
              className="fc-pill-btn"
              onClick={() => setLang((l) => (l === 'en' ? 'tr' : 'en'))}
            >
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
          </div>
        </header>

        {/* GYMNOTE ATMOSPHERE BAR */}
        <div className="fc-scene-bar">
          <span className="fc-scene-label">{t.sceneLabel}</span>
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

        {/* HOME VIEW */}
        {tab === 'home' && (
          <>
            <section className="fc-hero-grid">
              <div className="fc-metrics-col">
                {/* VARIED TRAINING CARD */}
                <div className="fc-card">
                  <div className="fc-card-head">
                    <span className="fc-card-title">{t.variedTitle}</span>
                    <span className="fc-badge">+25%</span>
                  </div>
                  <svg viewBox="0 0 320 96" width="100%" height="96">
                    <path
                      d="M 10 66 Q 85 18, 165 52 T 310 26"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 38 Q 90 84, 170 48 T 310 68"
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </svg>
                  <div className="fc-legend">
                    <span>
                      <i style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--accent)', display: 'inline-block' }} />
                      {t.progress}
                    </span>
                    <span>
                      <i style={{ width: 8, height: 8, borderRadius: 99, background: '#7c3aed', display: 'inline-block' }} />
                      {t.oldHabits}
                    </span>
                  </div>
                </div>

                {/* TRAINING INTENSITY CARD */}
                <div className="fc-card">
                  <div className="fc-card-head">
                    <span className="fc-card-title">{t.intensityTitle}</span>
                    <span className="fc-badge">+20%</span>
                  </div>
                  <div className="fc-ring-wrap">
                    <svg width="136" height="136" viewBox="0 0 136 136">
                      <circle
                        cx="68"
                        cy="68"
                        r="54"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="68"
                        cy="68"
                        r="54"
                        stroke="var(--accent)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="339.29"
                        strokeDashoffset={339.29 * (1 - 0.92)}
                        strokeLinecap="round"
                        transform="rotate(-90 68 68)"
                      />
                      <text
                        x="50%"
                        y="53%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff"
                        fontSize="26"
                        fontWeight="800"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        92%
                      </text>
                    </svg>
                  </div>
                  <div className="fc-legend">
                    <span>{t.progress}</span>
                    <span style={{ color: 'var(--accent)' }}>RPE 8.5 – 9.0</span>
                  </div>
                </div>
              </div>

              {/* HERO COPY */}
              <div className="fc-hero-copy">
                <div className="fc-kicker">{t.kicker}</div>
                <h1 className="fc-hero-title">
                  {t.heroTop}
                  <span className="highlight">{t.heroName}</span>
                </h1>
                <p className="fc-hero-desc">{t.heroDesc}</p>
                <div className="fc-cta-row">
                  <button type="button" className="fc-btn-primary" onClick={() => setTab('training')}>
                    {t.startBtn}
                  </button>
                  <button type="button" className="fc-btn-ghost" onClick={() => setTab('dashboard')}>
                    {t.dashBtn}
                  </button>
                </div>
              </div>
            </section>

            <section className="fc-pillars">
              {t.pillars.map((p) => (
                <div key={p.num} className="fc-card">
                  <div className="fc-pillar-num">{p.num}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{p.label}</div>
                </div>
              ))}
            </section>
          </>
        )}

        {/* TRAINING VIEW */}
        {tab === 'training' && (
          <section className="fc-training-layout">
            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.sessionTitle}</span>
                <span className="fc-badge">
                  {splits[activeSplit].filter((i) => i.done).length} / {splits[activeSplit].length}
                </span>
              </div>

              <div className="fc-split-pills">
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

              {splits[activeSplit].map((ex) => (
                <div key={ex.id} className={`fc-exercise-row ${ex.done ? 'done' : ''}`}>
                  <div className="fc-ex-name">{ex.name}</div>
                  <div className="fc-ex-meta">{ex.sets}</div>
                  <div className="fc-ex-meta">{ex.weight}</div>
                  <button type="button" className="fc-check-btn" onClick={() => toggleExercise(ex.id)}>
                    {ex.done ? `✓ ${t.doneLabel}` : t.markLabel}
                  </button>
                </div>
              ))}

              <form className="fc-quick-add" onSubmit={handleAddExercise}>
                <input
                  className="fc-input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={t.addPlaceholder}
                />
                <input
                  className="fc-input"
                  value={newSets}
                  onChange={(e) => setNewSets(e.target.value)}
                  placeholder={t.setsPlaceholder}
                />
                <input
                  className="fc-input"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder={t.weightPlaceholder}
                />
                <button type="submit" className="fc-btn-primary" style={{ padding: '10px 20px' }}>
                  {t.addBtn}
                </button>
              </form>
            </div>

            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.timerTitle}</span>
                <span className="fc-badge">{timerRunning ? 'LIVE' : 'READY'}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 0 }}>{t.timerSub}</p>
              <div className="fc-timer-display">{formatTimer(restSeconds)}</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="fc-pill-btn"
                  onClick={() => {
                    setRestSeconds(90);
                    setTimerRunning(true);
                  }}
                >
                  {t.start90}
                </button>
                <button
                  type="button"
                  className="fc-pill-btn"
                  onClick={() => {
                    setRestSeconds(60);
                    setTimerRunning(true);
                  }}
                >
                  {t.start60}
                </button>
                <button
                  type="button"
                  className="fc-pill-btn"
                  onClick={() => {
                    setTimerRunning(false);
                    setRestSeconds(90);
                  }}
                >
                  {t.reset}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* DASHBOARD VIEW */}
        {tab === 'dashboard' && (
          <section>
            <div className="fc-dash-grid">
              <div className="fc-card">
                <div className="fc-card-title">{t.streakCard}</div>
                <div className="fc-stat-big" style={{ color: 'var(--accent)' }}>
                  {currentStreak} {t.daysSuffix}
                </div>
              </div>
              <div className="fc-card">
                <div className="fc-card-title">{t.completedCard}</div>
                <div className="fc-stat-big">
                  {completedCount} / {allExercises.length}
                </div>
              </div>
              <div className="fc-card">
                <div className="fc-card-title">{t.consistencyCard}</div>
                <div className="fc-stat-big" style={{ color: 'var(--accent)' }}>
                  {consistencyPct}%
                </div>
              </div>
            </div>

            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.matrixTitle}</span>
                <span className="fc-badge">{activeDaysCount} / 28</span>
              </div>
              <div className="fc-matrix">
                {matrix.map((active, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`fc-matrix-cell ${active ? 'active' : ''}`}
                    onClick={() => toggleMatrixDay(idx)}
                  >
                    <span>D{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
