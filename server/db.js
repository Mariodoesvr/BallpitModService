const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./logs.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            playerName TEXT,
            reason TEXT,
            data TEXT,
            timestamp INTEGER
        )
    `);
});

function addLog(log) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO logs (type, playerName, reason, data, timestamp)
             VALUES (?, ?, ?, ?, ?)`,
            [
                log.type,
                log.playerName,
                log.reason,
                JSON.stringify(log.data || {}),
                Date.now()
            ],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
}

function getLogs() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM logs ORDER BY id ASC`, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function clearLogs() {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM logs`, [], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = { addLog, getLogs, clearLogs };
