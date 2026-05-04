const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let logs = [];

// Receive logs from Unity
app.post("/log", (req, res) => {
    const log = req.body;

    log.timestamp = new Date().toISOString();
    logs.push(log);

    console.log("LOG RECEIVED:", log);

    res.json({ status: "ok" });
});

// Send logs to web UI
app.get("/logs", (req, res) => {
    res.json(logs);
});

// optional: clear logs (admin tool)
app.post("/clear", (req, res) => {
    logs = [];
    res.json({ status: "cleared" });
});

app.listen(3000, () => {
    console.log("Moderation server running on port 3000");
});
