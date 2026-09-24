from flask import Flask, jsonify
from datetime import datetime
import socket

app = Flask(__name__)

services = [
    ("Apache", 82),
    ("Nginx", 94),
    ("Node.js", 86),
    ("Flask", 88),
    ("Prometheus", 9090),
    ("Grafana", 3001)
]


def check_service(port):
    try:
        sock = socket.create_connection(("host.docker.internal", port), timeout=2)
        sock.close()
        return "Online"
    except:
        return "Offline"


@app.route("/api/status")
def api_status():

    service_data = []

    for name, port in services:

        status = check_service(port)

        service_data.append({
            "name": name,
            "port": port,
            "status": status
        })

    online_count = sum(
        1 for service in service_data
        if service["status"] == "Online"
    )

    return jsonify({
        "services": service_data,
        "online": online_count,
        "total": len(service_data),
        "serverTime": datetime.now().strftime(
            "%d %B %Y, %I:%M:%S %p"
        )
    })


@app.route("/")
def home():

    return """
<!DOCTYPE html>

<html>

<head>

<title>CloudMonitor | Infrastructure Dashboard</title>

<style>

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #0f172a;
    color: white;
}

header {
    padding: 22px 8%;
    background: #111827;
    border-bottom: 1px solid #334155;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 25px;
    font-weight: bold;
    color: #22c55e;
}

.badge {
    background: #14532d;
    color: #86efac;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 13px;
}

.hero {
    padding: 60px 8%;
}

.hero h1 {
    font-size: 45px;
    margin-bottom: 10px;
}

.hero p {
    color: #94a3b8;
    font-size: 18px;
}

.dashboard {
    padding: 0 8% 70px;
}

.summary {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.summary-card {
    background: #1e293b;
    padding: 20px 25px;
    border-radius: 10px;
    min-width: 180px;
}

.summary-card strong {
    display: block;
    font-size: 28px;
    margin-top: 8px;
}

.services {
    max-width: 800px;
}

.service {
    padding: 20px;
    margin: 12px 0;
    background: #1e293b;
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.service span {
    margin-left: 15px;
    color: #94a3b8;
}

.online {
    color: #22c55e;
}

.offline {
    color: #ef4444;
}

.refresh {
    margin: 20px 0;
    padding: 12px 20px;
    background: #22c55e;
    color: #052e16;
    border: none;
    border-radius: 7px;
    font-weight: bold;
    cursor: pointer;
}

.refresh:hover {
    background: #4ade80;
}

.time {
    margin-top: 30px;
    padding: 20px;
    background: #1e293b;
    border-radius: 10px;
    max-width: 800px;
    color: #cbd5e1;
}

footer {
    text-align: center;
    padding: 30px;
    border-top: 1px solid #334155;
    color: #94a3b8;
}

</style>

</head>

<body>

<header>

<div class="logo">📊 CloudMonitor</div>

<div class="badge">● Flask API Connected</div>

</header>

<section class="hero">

<h1>Infrastructure Monitor</h1>

<p>
Live service information retrieved from the Python Flask backend.
</p>

</section>

<section class="dashboard">

<div class="summary">

<div class="summary-card">
Online
<strong id="onlineCount">-</strong>
</div>

<div class="summary-card">
Total Services
<strong id="totalCount">-</strong>
</div>

</div>

<button class="refresh" onclick="loadStatus()">
🔄 Refresh Status
</button>

<div class="services" id="services">

Loading services...

</div>

<div class="time">

<strong>Server Time:</strong>

<span id="serverTime">
Loading...
</span>

</div>

</section>

<footer>

CloudMonitor © 2026 | Python Flask + Gunicorn | Dynamic API

</footer>

<script>

async function loadStatus() {

    const response = await fetch("/api/status");

    const data = await response.json();

    document.getElementById("onlineCount").textContent =
        data.online;

    document.getElementById("totalCount").textContent =
        data.total;

    document.getElementById("serverTime").textContent =
        data.serverTime;

    const container =
        document.getElementById("services");

    container.innerHTML = "";

    data.services.forEach(service => {

        const div = document.createElement("div");

        div.className = "service";

        const statusClass =
            service.status === "Online"
                ? "online"
                : "offline";

        div.innerHTML = `

            <div>

                <strong>${service.name}</strong>

                <span>Port ${service.port}</span>

            </div>

            <div class="${statusClass}">

                ● ${service.status}

            </div>

        `;

        container.appendChild(div);

    });

}

loadStatus();

</script>

</body>

</html>
"""


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
