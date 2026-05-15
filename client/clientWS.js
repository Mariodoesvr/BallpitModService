const API = "https://ballpitmodservice.onrender.com";

/* -------------------------
   WEBSOCKET (REALTIME)
--------------------------*/
const socket = new WebSocket("wss://ballpitmodservice.onrender.com");

socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === "log") {
        addLog(msg.data);
    }
};

/* -------------------------
   LOAD INITIAL DATA
--------------------------*/
async function load() {
    const logs = await fetch(API + "/logs").then(r => r.json());
    const stats = await fetch(API + "/stats").then(r => r.json());

    document.getElementById("totalLogs").innerText = stats.totalLogs;

    document.getElementById("stats").innerText =
        JSON.stringify(stats.breakdown, null, 2);

    logs.forEach(addLog);
}

load();

/* -------------------------
   ADD LOG
--------------------------*/
function addLog(l) {
    const table = document.getElementById("logTable");

    const row = document.createElement("tr");

    const cls =
        l.type?.includes("block") ? "block" :
        l.type?.includes("report") ? "report" :
        "accept";

    row.innerHTML = `
        <td class="${cls}">${l.type}</td>
        <td>${l.playerName}</td>
        <td>${l.reason}</td>
        <td>${l.data || ""}</td>
        <td>${l.timestamp ? new Date(l.timestamp).toLocaleTimeString() : ""}</td>
    `;

    table.prepend(row);
}

/* -------------------------
   CLEAR LOGS
--------------------------*/
async function clearLogs() {
    await fetch(API + "/clear", { method: "POST" });
    document.getElementById("logTable").innerHTML = "";
}
