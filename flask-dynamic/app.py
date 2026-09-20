from flask import Flask
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def home():

    current_time = datetime.now().strftime("%d %B %Y, %I:%M:%S %p")

    services = [
        ("Apache", "82", "Online"),
        ("Nginx", "94", "Online"),
        ("Node.js", "86", "Online"),
        ("Flask", "88", "Online"),
        ("Prometheus", "9090", "Online"),
        ("Grafana", "3001", "Online")
    ]

    service_rows = ""

    for name, port, status in services:

        service_rows += f"""
        <div class="service">
            <div>
                <strong>{name}</strong>
                <span>Port {port}</span>
            </div>

            <div class="online">
                ● {status}
            </div>
        </div>
        """

    return f"""
<!DOCTYPE html>

<html>

<head>

<title>CloudMonitor | Infrastructure Dashboard</title>

<style>

* {{
    box-sizing: border-box;
}}

body {{
    margin: 0;
    font-family: Arial, sans-serif;
    background: #0f172a;
    color: white;
}}

header {{
    padding: 22px 8%;
    background: #111827;
    border-bottom: 1px solid #334155;
}}

.logo {{
    font-size: 25px;
    font-weight: bold;
    color: #22c55e;
}}

.hero {{
    padding: 70px 8%;
}}

.hero h1 {{
    font-size: 45px;
}}

.hero p {{
    color: #94a3b8;
    font-size: 18px;
}}

.dashboard {{
    padding: 0 8% 70px;
}}

.service {{
    max-width: 800px;
    padding: 20px;
    margin: 12px 0;
    background: #1e293b;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}}

.service span {{
    margin-left: 15px;
    color: #94a3b8;
}}

.online {{
    color: #22c55e;
}}

.time {{
    margin-top: 30px;
    padding: 20px;
    background: #1e293b;
    border-radius: 10px;
    max-width: 800px;
}}

footer {{
    text-align: center;
    padding: 30px;
    border-top: 1px solid #334155;
    color: #94a3b8;
}}

</style>

</head>

<body>

<header>

<div class="logo">📊 CloudMonitor</div>

</header>

<section class="hero">

<h1>Infrastructure Status</h1>

<p>
Real-time demonstration of a containerized cloud infrastructure.
</p>

</section>

<section class="dashboard">

<h2>Services</h2>

{service_rows}

<div class="time">

<strong>Server Time:</strong> {current_time}

</div>

</section>

<footer>

CloudMonitor © 2026 | Python Flask + Gunicorn

</footer>

</body>

</html>
"""


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
