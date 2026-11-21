import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const SCENES = [
  {
    id: 'chalk',
    tr: 'Magnezyum',
    en: 'Magnesium',
    quote: 'DISCIPLINE OVER MOTIVATION.',
    sub: '01 // CHALK & HEAVY IRON',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: '4am',
    tr: '04:00 AM',
    en: '04:00 AM',
    quote: 'BUILT IN THE DARK AT 04:00 AM.',
    sub: '02 // SILENT HOURS',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 'focus',
    tr: 'Odak',
    en: 'Focus',
    quote: 'NOBODY CARES. WORK HARDER.',
    sub: '03 // TUNNEL VISION',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 'grit',
    tr: 'Azim',
    en: 'Grit',
    quote: 'THE IRON NEVER LIES TO YOU.',
    sub: '04 // RELENTLESS CONSISTENCY',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=85',
  },
];

const ACCENTS = [
  { id: 'white', label: 'Pure White', hex: '#ffffff' },
  { id: 'lime', label: 'Gymnote Lime', hex: '#c8ff00' },
  { id: 'ember', label: 'Fitcore Ember', hex: '#ff5500' },
  { id: 'ice', label: 'Ice Cyan', hex: '#38bdf8' },
  { id: 'crimson', label: 'Iron Crimson', hex: '#f43f5e' },
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

const PLAYLISTS = [
  {
    id: 't1',
    title: '04:00 AM Heavy Iron Protocol',
    genre: 'Dark Industrial / Gym Phonk',
    bpm: '140 BPM',
    duration: '42:10',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 't2',
    title: 'Chalk & Barbell PR Session',
    genre: 'Hard Techno / Aggressive',
    bpm: '152 BPM',
    duration: '38:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 't3',
    title: 'Zero Distraction Hypertrophy',
    genre: 'Minimal Dark Bass',
    bpm: '128 BPM',
    duration: '51:20',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
  {
    id: 't4',
    title: 'Post-Session CNS Recovery',
    genre: 'Dark Ambient / Night Rain',
    bpm: '76 BPM',
    duration: '29:00',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
  },
];

const INITIAL_REVIEWS = [
  {
    id: 'r1',
    name: 'Mert K.',
    tag: '12-Week Recomp',
    rating: 5,
    textEn: 'Dropped 7% body fat while adding 22.5 kg to my bench press. The shift-style tracking keeps every set accountable.',
    textTr: 'Bench press agirligimi 22.5 kg artirirken yag oranimi %7 dusurdum. Vardiya tipi set takibi disiplini hic bozdurmuyor.',
  },
  {
    id: 'r2',
    name: 'Selin A.',
    tag: 'Strength & Macros',
    rating: 5,
    textEn: 'Clean nutrition macros without crash dieting. Hitting 4 sessions every week became automatic.',
    textTr: 'Sifir aclik kriziyle surdurulebilir makro plani. Haftada 4 antrenman artik tamamen aliskanliga donustu.',
  },
  {
    id: 'r3',
    name: 'Emre T.',
    tag: '1-on-1 Coaching',
    rating: 5,
    textEn: 'Form checks, progressive overload targets, and recovery adjustments are spot-on every single week.',
    textTr: 'Form analizleri, haftalik agirlik artis hedefleri ve toparlanma takibi her hafta nokta atisi ilerliyor.',
  },
];

const COPY = {
  en: {
    nav: {
      home: 'HOME',
      training: 'TRAINING',
      nutrition: 'NUTRITION',
      playlist: 'PLAYLIST',
      plans: 'PLANS & REVIEWS',
      profile: 'PROFILE',
    },
    kicker: 'GYMNOTE OLED SYSTEM • PERSONAL COACHING',
    heroTop: 'PERSONAL TRAINING WITH',
    heroName: 'FARUK AYDIN',
    heroDesc:
      'Unlock your full potential with customized strength programming, macro-calibrated nutrition, curated training audio, and a 28-day discipline matrix.',
    startBtn: 'START WORKOUT',
    plansBtn: 'COACHING PLANS',
    variedTitle: 'VARIED TRAINING',
    progress: 'PROGRESS',
    oldHabits: 'OLD HABITS',
    intensityTitle: 'TRAINING INTENSITY',
    galleryTitle: 'GYMNOTE ATMOSPHERE & MINDSET (CLICK TO APPLY BACKGROUND)',
    splitNames: { push: 'PUSH DAY', pull: 'PULL DAY', legs: 'LEG DAY' },
    sessionTitle: 'SHIFT-STYLE WORKOUT LOG',
    addPlaceholder: 'Exercise name (e.g. Incline Press)',
    addBtn: '+ ADD',
    doneLabel: 'DONE',
    markLabel: 'LOG SET',
    timerTitle: 'AUTO REST TIMER',
    timerSub: 'Automatically starts 90s rest when you log an exercise.',
    nutriTitle: 'MACRO & CALORIE CALCULATOR',
    weightLbl: 'Body Weight (kg)',
    goalLbl: 'Training Goal',
    goals: { cut: 'Fat Loss (Cut)', maintain: 'Recomp / Maintain', bulk: 'Lean Bulk' },
    kcalLbl: 'DAILY TARGET',
    proteinLbl: 'PROTEIN',
    carbsLbl: 'CARBS',
    fatsLbl: 'FATS',
    waterTitle: 'DAILY HYDRATION TRACKER',
    mealsTitle: 'SAMPLE HIGH-PROTEIN MEAL PROTOCOL',
    playlistTitle: 'DARK GYM AUDIO STREAM',
    playlistSub: 'Click any session mix to play live audio while logging your sets.',
    playBtn: 'PLAY',
    pauseBtn: 'PAUSE',
    plansTitle: 'MEMBERSHIP & COACHING TIERS',
    billingMonthly: 'MONTHLY',
    billingYearly: 'YEARLY (-20%)',
    selectPlan: 'SELECT PLAN',
    selectedPlan: 'ACTIVE SELECTION ✓',
    reviewsTitle: 'ATHLETE REVIEWS & TRANSFORMATIONS',
    addReviewTitle: 'LEAVE A REVIEW',
    namePh: 'Your Name',
    reviewPh: 'Share your training experience...',
    submitReview: 'POST REVIEW',
    profileTitle: 'ATHLETE PROFILE & GYMNOTE APPEARANCE',
    themeColorTitle: 'ACCENT COLOR (DEFAULT: PURE WHITE)',
    bgSceneTitle: 'BACKGROUND SCENE',
    matrixTitle: '28-DAY DISCIPLINE MATRIX',
    streakLbl: 'CURRENT STREAK',
    daysLbl: 'DAYS',
  },
  tr: {
    nav: {
      home: 'ANA SAYFA',
      training: 'ANTRENMAN',
      nutrition: 'BESLENME',
      playlist: 'PLAYLIST',
      plans: 'ABONELİK & YORUM',
      profile: 'PROFİL',
    },
    kicker: 'GYMNOTE OLED SİSTEMİ • BİREBİR KOÇLUK',
    heroTop: 'BİREBİR ANTRENMAN & KOÇLUK',
    heroName: 'FARUK AYDIN',
    heroDesc:
      'Hedeflerine özel tasarlanmış güç antrenmanları, makro odaklı beslenme planı, karanlık salon çalma listeleri ve 28 günlük disiplin matrisiyle potansiyelini zirveye taşı.',
    startBtn: 'ANTRENMANA BAŞLA',
    plansBtn: 'ABONELİK PAKETLERİ',
    variedTitle: 'ÇEŞİTLENDİRİLMİŞ ANTRENMAN',
    progress: 'GELİŞİM',
    oldHabits: 'ESKİ ALIŞKANLIK',
    intensityTitle: 'ANTRENMAN YOĞUNLUĞU',
    galleryTitle: 'GYMNOTE ATMOSFER & MOTİVASYON (ARKA PLAN YAPMAK İÇİN TIKLA)',
    splitNames: { push: 'İTİŞ (PUSH)', pull: 'ÇEKİŞ (PULL)', legs: 'BACAK (LEGS)' },
    sessionTitle: 'VARDİYA TİPİ ANTRENMAN KAYDI',
    addPlaceholder: 'Hareket adı (örn. Incline Press)',
    addBtn: '+ EKLE',
    doneLabel: 'TAMAM',
    markLabel: 'BİTİR',
    timerTitle: 'OTOMATİK DİNLENME SAYACI',
    timerSub: 'Bir hareketi tamamladığında otomatik 90 sn dinlenme başlatır.',
    nutriTitle: 'KALORİ VE MAKRO HESAPLAYICI',
    weightLbl: 'Vücut Ağırlığı (kg)',
    goalLbl: 'Beslenme Hedefi',
    goals: { cut: 'Definasyon (Yağ Yakımı)', maintain: 'Form Koruma / Recomp', bulk: 'Temiz Hacim (Lean Bulk)' },
    kcalLbl: 'GÜNLÜK HEDEF',
    proteinLbl: 'PROTEİN',
    carbsLbl: 'KARBONHİDRAT',
    fatsLbl: 'YAĞ',
    waterTitle: 'GÜNLÜK SU TAKİBİ (BARDAK)',
    mealsTitle: 'ÖRNEK YÜKSEK PROTEİNLİ ÖĞÜN PLANI',
    playlistTitle: 'KARANLIK SALON ANTRENMAN LİSTESİ',
    playlistSub: 'Setlerini girerken dinlemek istediğin antrenman miksine tıkla.',
    playBtn: 'OYNAT',
    pauseBtn: 'DURAKLAT',
    plansTitle: 'KOÇLUK VE ABONELİK PAKETLERİ',
    billingMonthly: 'AYLIK',
    billingYearly: 'YILLIK (%20 İNDİRİM)',
    selectPlan: 'PAKETİ SEÇ',
    selectedPlan: 'SEÇİLİ PAKET ✓',
    reviewsTitle: 'ÜYE YORUMLARI VE DÖNÜŞÜMLER',
    addReviewTitle: 'YORUM EKLE',
    namePh: 'Adınız',
    reviewPh: 'Antrenman ve koçluk deneyiminizi yazın...',
    submitReview: 'YORUMU GÖNDER',
    profileTitle: 'SPORCU PROFİLİ & GYMNOTE GÖRÜNÜM AYARLARI',
    themeColorTitle: 'ANA VURGU RENGİ (VARSAYILAN: BEYAZ)',
    bgSceneTitle: 'ARKA PLAN SAHNESİ',
    matrixTitle: '28 GÜNLÜK DİSİPLİN MATRİSİ',
    streakLbl: 'AKTİF SERİ',
    daysLbl: 'GÜN',
  },
};

const DEFAULT_MATRIX = Array.from({ length: 28 }, (_, i) =>
  [0, 1, 2, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 19, 20, 21, 23, 24, 25, 26, 27].includes(i)
);

export default function App() {
  const [tab, setTab] = useState('home');
  const [lang, setLang] = useState(() => localStorage.getItem('fc_lang_v2') || 'en');
  const [accent, setAccent] = useState(() => localStorage.getItem('fc_accent_v2') || 'white');
  const [sceneId, setSceneId] = useState(() => localStorage.getItem('fc_scene_v2') || 'chalk');

  const [splits, setSplits] = useState(() => {
    try {
      const saved = localStorage.getItem('fc_splits_v2');
      return saved ? JSON.parse(saved) : INITIAL_SPLITS;
    } catch {
      return INITIAL_SPLITS;
    }
  });
  const [activeSplit, setActiveSplit] = useState('push');
  const [newName, setNewName] = useState('');
  const [newSets, setNewSets] = useState('4x10');
  const [newWeight, setNewWeight] = useState('70 kg');
  const [restSeconds, setRestSeconds] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);

  const [bodyWeight, setBodyWeight] = useState(80);
  const [goal, setGoal] = useState('maintain');
  const [waterCups, setWaterCups] = useState(6);

  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  const [yearly, setYearly] = useState(false);
  const [selectedTier, setSelectedTier] = useState('pro');
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [revName, setRevName] = useState('');
  const [revText, setRevText] = useState('');

  const [athleteName, setAthleteName] = useState('Faruk Aydın');
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);

  const t = COPY[lang];
  const currentScene = SCENES.find((s) => s.id === sceneId) || SCENES[0];

  useEffect(() => localStorage.setItem('fc_lang_v2', lang), [lang]);
  useEffect(() => localStorage.setItem('fc_accent_v2', accent), [accent]);
  useEffect(() => localStorage.setItem('fc_scene_v2', sceneId), [sceneId]);
  useEffect(() => localStorage.setItem('fc_splits_v2', JSON.stringify(splits)), [splits]);

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

  const toggleTrack = (track) => {
    if (!audioRef.current) return;
    if (playingId === track.id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      audioRef.current.src = track.audioUrl;
      audioRef.current.play().catch(() => {});
      setPlayingId(track.id);
    }
  };

  const toggleExercise = (id) => {
    setSplits((prev) => ({
      ...prev,
      [activeSplit]: prev[activeSplit].map((ex) => {
        if (ex.id === id) {
          const next = !ex.done;
          if (next) {
            setRestSeconds(90);
            setTimerRunning(true);
          }
          return { ...ex, done: next };
        }
        return ex;
      }),
    }));
  };

  const addExercise = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSplits((prev) => ({
      ...prev,
      [activeSplit]: [
        ...prev[activeSplit],
        { id: String(Date.now()), name: newName.trim(), sets: newSets, weight: newWeight, done: false },
      ],
    }));
    setNewName('');
  };

  const addReview = (e) => {
    e.preventDefault();
    if (!revName.trim() || !revText.trim()) return;
    setReviews((prev) => [
      {
        id: String(Date.now()),
        name: revName.trim(),
        tag: 'Verified Member',
        rating: 5,
        textEn: revText.trim(),
        textTr: revText.trim(),
      },
      ...prev,
    ]);
    setRevName('');
    setRevText('');
  };

  const baseKcal = Math.round(bodyWeight * 33);
  const targetKcal = goal === 'cut' ? baseKcal - 450 : goal === 'bulk' ? baseKcal + 350 : baseKcal;
  const proteinG = Math.round(bodyWeight * 2.1);
  const fatsG = Math.round(bodyWeight * 0.85);
  const carbsG = Math.max(80, Math.round((targetKcal - proteinG * 4 - fatsG * 9) / 4));

  let streak = 0;
  for (let i = matrix.length - 1; i >= 0; i -= 1) {
    if (matrix[i]) streak += 1;
    else break;
  }

  const formatTimer = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  return (
    <div className="fc-shell" data-accent={accent}>
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />
      <div className="fc-bg-layer" style={{ backgroundImage: `url("${currentScene.image}")` }} />
      <div className="fc-bg-vignette" />

      <div className="fc-content">
        <header className="fc-nav">
          <div className="fc-brand" onClick={() => setTab('home')}>
            <span className="fc-brand-dot" />
            <span>FITCORE</span>
          </div>

          <nav className="fc-tabs">
            {['home', 'training', 'nutrition', 'playlist', 'plans', 'profile'].map((key) => (
              <button
                key={key}
                type="button"
                className={`fc-tab ${tab === key ? 'active' : ''}`}
                onClick={() => setTab(key)}
              >
                {t.nav[key]}
              </button>
            ))}
          </nav>

          <div className="fc-controls">
            <div className="fc-color-dots" title="Theme Color">
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

        {tab === 'home' && (
          <>
            <section className="fc-hero-grid">
              <div className="fc-metrics-col">
                <div className="fc-card">
                  <div className="fc-card-head">
                    <span className="fc-card-title">{t.variedTitle}</span>
                    <span className="fc-badge">+25%</span>
                  </div>
                  <svg viewBox="0 0 320 92" width="100%" height="92">
                    <path
                      d="M 10 66 Q 85 18, 165 50 T 310 24"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 38 Q 90 82, 170 48 T 310 68"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="fc-legend">
                    <span>● {t.progress}</span>
                    <span>● {t.oldHabits}</span>
                  </div>
                </div>

                <div className="fc-card">
                  <div className="fc-card-head">
                    <span className="fc-card-title">{t.intensityTitle}</span>
                    <span className="fc-badge">+20%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
                    <svg width="132" height="132" viewBox="0 0 136 136">
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

              <div>
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
                  <button type="button" className="fc-btn-ghost" onClick={() => setTab('plans')}>
                    {t.plansBtn}
                  </button>
                </div>
              </div>
            </section>

            <div style={{ marginTop: 34 }}>
              <div className="fc-card-title" style={{ marginBottom: 12 }}>
                {t.galleryTitle}
              </div>
              <div className="fc-quote-cards">
                {SCENES.map((sc) => (
                  <div
                    key={sc.id}
                    className="fc-visual-card"
                    style={{
                      borderColor: sceneId === sc.id ? 'var(--accent)' : undefined,
                    }}
                    onClick={() => setSceneId(sc.id)}
                  >
                    <img src={sc.image} alt={sc.en} />
                    <div className="fc-visual-card-content">
                      <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, marginBottom: 4 }}>
                        {sc.sub}
                      </div>
                      <div className="fc-visual-quote">“{sc.quote}”</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'training' && (
          <section className="fc-grid-2">
            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.sessionTitle}</span>
                <span className="fc-badge">
                  {splits[activeSplit].filter((i) => i.done).length} / {splits[activeSplit].length}
                </span>
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

              {splits[activeSplit].map((ex) => (
                <div key={ex.id} className={`fc-exercise-row ${ex.done ? 'done' : ''}`}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{ex.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, color: 'var(--text-muted)' }}>
                    {ex.sets}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, color: 'var(--text-muted)' }}>
                    {ex.weight}
                  </div>
                  <button type="button" className="fc-scene-chip active" onClick={() => toggleExercise(ex.id)}>
                    {ex.done ? `✓ ${t.doneLabel}` : t.markLabel}
                  </button>
                </div>
              ))}

              <form
                onSubmit={addExercise}
                style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr 0.6fr auto', gap: 8, marginTop: 14 }}
              >
                <input
                  className="fc-input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={t.addPlaceholder}
                />
                <input className="fc-input" value={newSets} onChange={(e) => setNewSets(e.target.value)} />
                <input className="fc-input" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} />
                <button type="submit" className="fc-btn-primary" style={{ padding: '10px 18px' }}>
                  {t.addBtn}
                </button>
              </form>
            </div>

            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.timerTitle}</span>
                <span className="fc-badge">{timerRunning ? 'LIVE' : 'READY'}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.timerSub}</p>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 52,
                  fontWeight: 800,
                  textAlign: 'center',
                  color: 'var(--accent)',
                  margin: '18px 0',
                }}
              >
                {formatTimer(restSeconds)}
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button
                  type="button"
                  className="fc-scene-chip active"
                  onClick={() => {
                    setRestSeconds(90);
                    setTimerRunning(true);
                  }}
                >
                  90s
                </button>
                <button
                  type="button"
                  className="fc-scene-chip"
                  onClick={() => {
                    setRestSeconds(60);
                    setTimerRunning(true);
                  }}
                >
                  60s
                </button>
                <button
                  type="button"
                  className="fc-scene-chip"
                  onClick={() => {
                    setTimerRunning(false);
                    setRestSeconds(90);
                  }}
                >
                  RESET
                </button>
              </div>
              <div
                style={{
                  marginTop: 26,
                  paddingTop: 16,
                  borderTop: '1px solid var(--glass-border)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                }}
              >
                “CONSISTENCY IS THE ONLY SHORTCUT.”
              </div>
            </div>
          </section>
        )}

        {tab === 'nutrition' && (
          <section className="fc-grid-2">
            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.nutriTitle}</span>
                <span className="fc-badge">{bodyWeight} KG</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    {t.weightLbl}
                  </label>
                  <input
                    type="number"
                    className="fc-input"
                    value={bodyWeight}
                    min={40}
                    max={160}
                    onChange={(e) => setBodyWeight(Number(e.target.value) || 75)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    {t.goalLbl}
                  </label>
                  <div className="fc-scene-list">
                    {['cut', 'maintain', 'bulk'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={`fc-scene-chip ${goal === g ? 'active' : ''}`}
                        onClick={() => setGoal(g)}
                      >
                        {t.goals[g]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                <div className="fc-macro-box">
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{t.kcalLbl}</div>
                  <div className="fc-macro-val">{targetKcal}</div>
                  <div style={{ fontSize: 11 }}>kcal</div>
                </div>
                <div className="fc-macro-box">
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{t.proteinLbl}</div>
                  <div className="fc-macro-val">{proteinG}g</div>
                  <div style={{ fontSize: 11 }}>2.1g / kg</div>
                </div>
                <div className="fc-macro-box">
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{t.carbsLbl}</div>
                  <div className="fc-macro-val">{carbsG}g</div>
                  <div style={{ fontSize: 11 }}>Glycogen</div>
                </div>
                <div className="fc-macro-box">
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{t.fatsLbl}</div>
                  <div className="fc-macro-val">{fatsG}g</div>
                  <div style={{ fontSize: 11 }}>Hormonal</div>
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <div className="fc-card-title" style={{ marginBottom: 10 }}>
                  {t.mealsTitle}
                </div>
                <div className="fc-exercise-row">
                  <strong>01 // Oats, Whey Isolate &amp; Espresso</strong>
                  <span>520 kcal</span>
                  <span>42g P</span>
                  <span className="fc-badge">PRE</span>
                </div>
                <div className="fc-exercise-row">
                  <strong>02 // Grilled Chicken Breast &amp; Jasmine Rice</strong>
                  <span>740 kcal</span>
                  <span>58g P</span>
                  <span className="fc-badge">POST</span>
                </div>
                <div className="fc-exercise-row">
                  <strong>03 // Lean Beef / Salmon, Avocado &amp; Greens</strong>
                  <span>690 kcal</span>
                  <span>52g P</span>
                  <span className="fc-badge">DINNER</span>
                </div>
              </div>
            </div>

            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.waterTitle}</span>
                <span className="fc-badge">{(waterCups * 0.35).toFixed(1)} L / 3.5 L</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 14 }}>
                {Array.from({ length: 10 }, (_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`fc-matrix-cell ${idx < waterCups ? 'active' : ''}`}
                    onClick={() => setWaterCups(idx + 1)}
                  >
                    350ml
                  </button>
                ))}
              </div>
              <p style={{ marginTop: 20, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                “ABS ARE REVEALED IN THE KITCHEN. STRENGTH IS FORGED UNDER THE BAR.”
              </p>
            </div>
          </section>
        )}

        {tab === 'playlist' && (
          <section className="fc-card">
            <div className="fc-card-head">
              <span className="fc-card-title">{t.playlistTitle}</span>
              <span className="fc-badge">{playingId ? 'AUDIO LIVE' : 'IDLE'}</span>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 0, marginBottom: 18 }}>
              {t.playlistSub}
            </p>

            {PLAYLISTS.map((tr) => {
              const isPlaying = playingId === tr.id;
              return (
                <div key={tr.id} className={`fc-track-row ${isPlaying ? 'playing' : ''}`} onClick={() => toggleTrack(tr)}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14.5 }}>{tr.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {tr.genre} • {tr.bpm} • {tr.duration}
                    </div>
                  </div>
                  <button type="button" className="fc-scene-chip active">
                    {isPlaying ? `❚❚ ${t.pauseBtn}` : `▶ ${t.playBtn}`}
                  </button>
                </div>
              );
            })}
          </section>
        )}

        {tab === 'plans' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="fc-card-title">{t.plansTitle}</span>
              <div className="fc-lang-switch">
                <button
                  type="button"
                  className={`fc-lang-btn ${!yearly ? 'active' : ''}`}
                  onClick={() => setYearly(false)}
                >
                  {t.billingMonthly}
                </button>
                <button
                  type="button"
                  className={`fc-lang-btn ${yearly ? 'active' : ''}`}
                  onClick={() => setYearly(true)}
                >
                  {t.billingYearly}
                </button>
              </div>
            </div>

            <section className="fc-grid-3" style={{ marginBottom: 28 }}>
              {[
                {
                  id: 'starter',
                  name: 'SELF-GUIDED SPLIT',
                  price: yearly ? '$15' : '$19',
                  perks: ['GYMNOTE Shift Templates', 'Macro & Hydration Targets', '28-Day Discipline Matrix'],
                },
                {
                  id: 'pro',
                  name: 'PRO HYPERTROPHY',
                  featured: true,
                  price: yearly ? '$39' : '$49',
                  perks: ['Custom Progressive Overload Plan', 'Bi-Weekly Macro Adjustments', 'Form Video Breakdowns'],
                },
                {
                  id: 'elite',
                  name: '1-ON-1 ELITE COACHING',
                  price: yearly ? '$79' : '$99',
                  perks: ['Direct 1-on-1 Coaching w/ Faruk Aydın', 'Weekly Check-Ins & Peak Prep', '24/7 Priority Accountability'],
                },
              ].map((plan) => (
                <div key={plan.id} className={`fc-card fc-plan-card ${plan.featured ? 'featured' : ''}`}>
                  <div>
                    <div className="fc-card-head">
                      <span className="fc-card-title">{plan.name}</span>
                      {plan.featured && <span className="fc-badge">POPULAR</span>}
                    </div>
                    <div className="fc-price">
                      {plan.price}
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}> / mo</span>
                    </div>
                    <ul style={{ paddingLeft: 18, color: '#d4d4d8', fontSize: 13, lineHeight: 1.8 }}>
                      {plan.perks.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className={selectedTier === plan.id ? 'fc-btn-primary' : 'fc-btn-ghost'}
                    style={{ marginTop: 14, width: '100%' }}
                    onClick={() => setSelectedTier(plan.id)}
                  >
                    {selectedTier === plan.id ? t.selectedPlan : t.selectPlan}
                  </button>
                </div>
              ))}
            </section>

            <section className="fc-grid-2">
              <div className="fc-card">
                <div className="fc-card-head">
                  <span className="fc-card-title">{t.reviewsTitle}</span>
                  <span className="fc-badge">★ 5.0</span>
                </div>
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong>
                        {r.name} <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>• {r.tag}</span>
                      </strong>
                      <span style={{ color: 'var(--accent)' }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#d4d4d8', lineHeight: 1.55 }}>
                      {lang === 'tr' ? r.textTr : r.textEn}
                    </div>
                  </div>
                ))}
              </div>

              <div className="fc-card">
                <div className="fc-card-title" style={{ marginBottom: 12 }}>
                  {t.addReviewTitle}
                </div>
                <form onSubmit={addReview} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input
                    className="fc-input"
                    value={revName}
                    onChange={(e) => setRevName(e.target.value)}
                    placeholder={t.namePh}
                  />
                  <textarea
                    className="fc-input"
                    style={{ borderRadius: 18, minHeight: 96, resize: 'vertical' }}
                    value={revText}
                    onChange={(e) => setRevText(e.target.value)}
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

        {tab === 'profile' && (
          <section className="fc-grid-2">
            <div className="fc-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{t.profileTitle}</span>
                <span className="fc-badge">
                  {streak} {t.daysLbl} {t.streakLbl}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 999,
                    background: 'var(--accent)',
                    color: 'var(--accent-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: 20,
                  }}
                >
                  FA
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    className="fc-input"
                    value={athleteName}
                    onChange={(e) => setAthleteName(e.target.value)}
                  />
                </div>
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
                    <span
                      style={{
                        display: 'inline-block',
                        width: 9,
                        height: 9,
                        borderRadius: 99,
                        background: c.hex,
                        marginRight: 6,
                      }}
                    />
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
                <span className="fc-badge">{matrix.filter(Boolean).length} / 28</span>
              </div>
              <div className="fc-matrix">
                {matrix.map((on, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`fc-matrix-cell ${on ? 'active' : ''}`}
                    onClick={() => setMatrix((prev) => prev.map((v, i) => (i === idx ? !v : v)))}
                  >
                    D{idx + 1}
                  </button>
                ))}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: 'JetBrains Mono',
                  fontSize: 11.5,
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                }}
              >
                “WE DO NOT RISE TO THE LEVEL OF OUR GOALS. WE FALL TO THE LEVEL OF OUR SYSTEMS.”
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
