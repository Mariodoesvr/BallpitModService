const express = require("express");
const http = require("http");
const cors = require("cors");

const { addLog, getLogs, clearLogs } = require("./db");
const { initWebSocket, broadcastLog } = require("./websocket");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

/* -------------------------
   RECEIVE LOGS (Unity / Game)
--------------------------*/
app.post("/log", async (req, res) => {
    const log = req.body || {};
    log.timestamp = Date.now();

    await addLog(log);
    broadcastLog(log);

    res.json({ ok: true });
});

/* -------------------------
   GET LOGS
--------------------------*/
app.get("/logs", async (req, res) => {
    const logs = await getLogs();
    res.json(logs);
});

/* -------------------------
   STATS
--------------------------*/
app.get("/stats", async (req, res) => {
    const logs = await getLogs();

    const breakdown = {};

    for (const l of logs) {
        breakdown[l.type] = (breakdown[l.type] || 0) + 1;
    }

    res.json({
        totalLogs: logs.length,
        breakdown
    });
});

/* -------------------------
   CLEAR LOGS
--------------------------*/
app.post("/clear", async (req, res) => {
    await clearLogs();
    res.json({ ok: true });
});

/* -------------------------
   START
--------------------------*/
initWebSocket(server);

server.listen(3000, () => {
    console.log("The Ballpit Mod System running on port 3000");
});
