const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

// 🔐 Allowed moderator emails
const MOD_EMAILS = [
    "youremail@gmail.com"
];

// 🔑 Secret fallback code
const SECRET_CODE = "dev123";

// 📦 Logs storage
let logs = [];

/* -------------------------
   GOOGLE AUTH
--------------------------*/
app.post("/auth", async (req, res) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: "YOUR_GOOGLE_CLIENT_ID"
        });

        const payload = ticket.getPayload();
        const email = payload.email;

        if (MOD_EMAILS.includes(email)) {
            return res.json({ success: true });
        }

        return res.json({ success: false });

    } catch {
        return res.json({ success: false });
    }
});

/* -------------------------
   SECRET CODE AUTH
--------------------------*/
app.post("/code-auth", (req, res) => {
    const { code } = req.body;

    if (code === SECRET_CODE) {
        return res.json({ success: true });
    }

    return res.json({ success: false });
});

/* -------------------------
   RECEIVE UNITY LOGS
--------------------------*/
app.post("/log", (req, res) => {
    const log = req.body;

    log.timestamp = Date.now();
    logs.push(log);

    console.log("LOG:", log);

    res.json({ ok: true });
});

/* -------------------------
   GET LOGS
--------------------------*/
app.get("/logs", (req, res) => {
    res.json(logs);
});

/* -------------------------
   ANALYTICS
--------------------------*/
app.get("/stats", (req, res) => {
    const breakdown = {};

    logs.forEach(l => {
        breakdown[l.type] = (breakdown[l.type] || 0) + 1;
    });

    res.json({
        totalLogs: logs.length,
        breakdown
    });
});

/* -------------------------
   CLEAR LOGS
--------------------------*/
app.post("/clear", (req, res) => {
    logs = [];
    res.json({ ok: true });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
