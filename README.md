# The Ballpit — Moderation Dashboard

A real-time moderation system for **The Ballpit** multiplayer game.

This system handles:
- 🔐 Google moderator 
- 📡 Live moderation feed (WebSockets)
- 🗄 Persistent SQLite log database
- ☁️ Render deployment ready
- 🎮 Unity / server log ingestion
- PlayFab integration

---

# 🚀 Features

## 🧠 Backend
- Express API server
- SQLite persistent storage (no log loss on restart)
- WebSocket real-time updates
- Google OAuth moderator authentication
- Secret code login fallback

## 📊 Dashboard
- Live log feed (no refresh needed)
- Player reports / blocks tracking
- Stats breakdown system
- Manual log clearing
- Instant updates from server

---

# ⚙️ Setup (Local)

## 1. Install dependencies
npm install

---

## 2. Start server
npm start

Server runs at:
http://localhost:3000

---

## 3. Open dashboard
Open:
client/index.html

OR serve via backend in production.

---

# 🔑 Configuration

## Google Login
Set your OAuth client ID in:

server/index.js
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

---

## Moderator Emails
const MOD_EMAILS = [
  "your@email.com"
];

---

# 🌐 API Endpoints

## POST /log
Used by Unity / game servers

{
  "type": "report",
  "playerName": "Player1",
  "reason": "cheating",
  "data": {}
}

---

## GET /logs
Returns all logs

---

## GET /stats
Returns:
- total logs
- breakdown by type

---

## POST /clear
Clears all logs

---

# ⚡ WebSocket (Real-Time Updates)

Connect:
ws://localhost:3000

Event:
{
  "type": "log",
  "data": { ... }
}

Used for instant dashboard updates.

---

# ☁️ Deploy on Render

## Build Command
npm install

## Start Command
npm start

---

## IMPORTANT: Frontend API change

Before deploy:
const API = "http://localhost:3000";

After deploy:
const API = "https://your-app.onrender.com";

---

# 🧠 Tech Stack
- Node.js
- Express
- SQLite
- WebSockets (ws)
- Google Auth Library
- Vanilla HTML/JS

---

# 🔮 Planned Features
- PlayFab ban automation
- Analytics charts (report heatmaps)
- Audit log history viewer

---
