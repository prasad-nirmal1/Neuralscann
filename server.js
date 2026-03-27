// NeuralScan v3 — server.js (Render Safe Version)

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// ── SAFE SQLITE (DISABLED ON RENDER) ─────────────────────────────
let db = null;
console.log("⚠️ SQLite disabled on Render (using localStorage mode)");

// ── MIDDLEWARE ──────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '8mb' }));
app.use(express.static(path.join(__dirname, '..')));

// ── GROQ PROXY ──────────────────────────────────────────────────
app.post('/api/groq', async (req, res) => {
  const GROQ_KEY = process.env.GROQ_KEY;

  if (!GROQ_KEY) {
    return res.status(500).json({ error: 'GROQ_KEY not set' });
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 90000);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    clearTimeout(timer);

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({
      error: err.name === 'AbortError' ? 'Request timed out' : err.message
    });
  }
});

// ── HISTORY API (DISABLED WITHOUT DB) ────────────────────────────
app.post('/api/history', (_req, res) => {
  res.json({ ok: false, reason: 'no-db' });
});

app.get('/api/history', (_req, res) => {
  res.json({ ok: false, rows: [] });
});

app.get('/api/history/:id', (_req, res) => {
  res.status(404).json({ ok: false });
});

app.delete('/api/history/:id', (_req, res) => {
  res.json({ ok: false });
});

// ── HEALTH CHECK ────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    db: 'disabled',
    time: new Date().toISOString()
  });
});

// ── SERVE FRONTEND ──────────────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── START SERVER ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🔬 NeuralScan LIVE on port ${PORT}`);
});