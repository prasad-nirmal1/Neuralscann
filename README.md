# 🔬 NeuralScan — AI Code Analyzer v3.0

AI-powered code analysis using Groq `llama-3.3-70b-versatile`.
9 analysis modes · 20+ languages · file upload · test results · history · dashboard · PDF export.

---

## 📁 File Structure

```
neuralscan/
│
├── index.html              ← Open in browser (or served by Node)
├── package.json
├── .env.example            ← Copy to .env and add your Groq key
├── .gitignore
├── README.md
│
├── css/
│   └── styles.css
│
├── js/
│   ├── config.js           ← API settings (no key here in v3!)
│   ├── state.js            ← App state, language maps
│   ├── helpers.js          ← DOM utils, toast, stats
│   ├── ui.js               ← Selectors, tabs
│   ├── upload.js           ← File upload + drag & drop
│   ├── editor.js           ← Editor, shortcuts, samples
│   ├── download.js         ← Download fixed code, export JSON
│   ├── groq.js             ← Groq API client (proxy-aware)
│   ├── prompts.js          ← All 9 AI prompts
│   ├── history.js          ← ★ NEW: Analysis history + dashboard charts
│   ├── pdf.js              ← ★ NEW: PDF report export
│   ├── analysis.js         ← runAnalysis() orchestrator
│   └── render.js           ← All result renderers
│
└── server/
    ├── server.js           ← ★ UPDATED: Groq proxy + SQLite history API
    └── history.db          ← Auto-created when you run npm start
```

---

## ▶️ How to Run

### Option 1 — Node.js Server (RECOMMENDED for diploma)

**Step 1:** Install Node.js 18+ from https://nodejs.org

**Step 2:** Copy the env file and add your API key
```bash
cp .env.example .env
# Open .env in any text editor and set:
# GROQ_KEY=gsk_your_actual_key_here
```
Get a free key at → https://console.groq.com

**Step 3:** Install and start
```bash
npm install
npm start
```

**Step 4:** Open http://localhost:3000

Dev mode (auto-restart on file changes):
```bash
npm run dev
```

---

### Option 2 — Direct File (quick test, no server)

1. Open `js/config.js`
2. Paste your key into `DIRECT_KEY = 'gsk_...'`
3. Double-click `index.html`

> ⚠️ History will save to localStorage only (no SQLite DB).
> Remove the key from config.js before submitting your project.

---

## ★ What's New in v3

| Feature | Details |
|---------|---------|
| 🔒 Secure API key | Key lives in `.env`, never in browser JS |
| 🕐 Analysis history | Every result auto-saved to SQLite (server) or localStorage |
| 📋 PDF export | Full report: summary, bugs, security, tests — one click |
| 📊 Dashboard | 4 charts: score trend, mode distribution, languages, issues |
| 📱 Mobile layout | Responsive — works on phone/tablet |

---

## 🗄️ Database Setup (SQLite)

SQLite is built into the server — **no separate install needed**.

The database file `server/history.db` is created automatically when you run `npm start`.

To enable it, just install the Node package:
```bash
npm install better-sqlite3
```
This is already in `package.json` so `npm install` handles it.

If `better-sqlite3` fails to build (rare), history falls back to localStorage automatically — the app still works.

---

## 🔑 API Key Security

| Where | v2 (old) | v3 (new) |
|-------|----------|----------|
| Browser JS | ✗ Key visible in config.js | ✓ No key in browser |
| Server | Not used | ✓ Key in .env (never committed) |
| Git | Key exposed | ✓ .gitignore protects .env |

---

## 🧪 Analysis Modes

| Mode | Description |
|------|-------------|
| 🔬 Full Analysis | Bugs, security, performance, test suite |
| 🎯 Intent Analyzer | Stated intent vs actual implementation |
| ⚡ Execution Simulator | Step-by-step variable trace |
| 🛠 Auto Debug | Auto-fixes all issues |
| 🧑‍🏫 Dev Coach | Explanations for beginner/intermediate/senior |
| 🔄 Version Compare | Regressions and improvements between two versions |
| 🧬 Code DNA | Style fingerprint and experience level |
| ⏳ Time Travel | Refactor into 1990s–2030s styles |
| ⚔️ Adversarial Test | SQL injection, XSS, fuzzing attacks |

---

## 🛠 Troubleshooting

| Problem | Fix |
|---------|-----|
| `GROQ_KEY not set` | Create `.env` from `.env.example`, add your key |
| `better-sqlite3` build error | Run `npm install --ignore-scripts` — history uses localStorage |
| Port in use | `PORT=4000 npm start` |
| Blank page | Check browser console (F12) for errors |
| History not saving | Check server is running at localhost:3000 |
