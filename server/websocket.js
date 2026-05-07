const WebSocket = require("ws");

let wss;

function initWebSocket(server) {
    wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        ws.send(JSON.stringify({ type: "connected" }));
    });
}

function broadcastLog(log) {
    if (!wss) return;

    const msg = JSON.stringify({
        type: "log",
        data: log
    });

    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(msg);
        }
    });
}

module.exports = { initWebSocket, broadcastLog };
