# FITCORE — Strength & Conditioning Web Toolkit (Portfolio Demo)

- **Live Demo:** [farukaydinn96-commits.github.io/fitness-website](https://farukaydinn96-commits.github.io/fitness-website/)
- **Repository:** [github.com/farukaydinn96-commits/fitness-website](https://github.com/farukaydinn96-commits/fitness-website)

FITCORE is a single-page fitness and personal-coaching portfolio demo built with React and Vite. All coaching tiers and transformation case studies are clearly labeled as illustrative demo content.

## Features

- **Date-Keyed Workout Log & Drift-Free Rest Timer:** Logs completed sets per `YYYY-MM-DD` date with a timestamp-based (`Date.now()`) countdown timer and Web Audio completion chime.
- **Epley 1RM & Olympic Barbell Plate Calculator:** Computes estimated 1-rep max, working weight percentages (85% / 75%), and per-side plate loading on a 20 kg bar.
- **Mifflin-St Jeor TDEE & Macro Calculator:** Validated inputs (sex, age, height, weight, activity multiplier, goal) with safe minimum calorie bounds and non-medical disclaimer.
- **Web Audio Focus Synthesizer:** Generates royalty-free rhythmic BPM pulses and ambient focus tones directly in the browser without external MP3 hotlinks.
- **Real Calendar 28-Day Habit Log & URL Hash Routing:** Persists state via a custom `useLocalStorage` hook, syncs tabs with `window.location.hash`, and supports side-by-side EN/TR localization.

## Run & Test Locally

```bash
npm install
npm test
npm run dev
```
