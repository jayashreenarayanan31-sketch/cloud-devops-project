const express = require("express");

const app = express();

const tasks = [
    "Deploy application",
    "Monitor containers",
    "Check server health",
    "Review CI/CD pipeline"
];

app.get("/", (req, res) => {

    const currentTime = new Date().toLocaleString();

    const taskList = tasks
        .map(task => `<li>✅ ${task}</li>`)
        .join("");

    res.send(`
<!DOCTYPE html>

<html>

<head>

<title>TaskFlow | Project Dashboard</title>

<style>

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f1f5f9;
    color: #1e293b;
}

header {
    background: #2563eb;
    color: white;
    padding: 22px 8%;
    display: flex;
    justify-content: space-between;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.hero {
    padding: 70px 8%;
    background: white;
}

.hero h1 {
    font-size: 45px;
    margin-bottom: 10px;
}

.hero p {
    color: #64748b;
    font-size: 18px;
}

.dashboard {
    padding: 50px 8%;
}

.card {
    background: white;
    max-width: 700px;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 12px;
    margin: 8px 0;
    background: #eff6ff;
    border-radius: 6px;
}

.status {
    margin-top: 25px;
    padding: 15px;
    background: #dcfce7;
    color: #166534;
    border-radius: 8px;
}

footer {
    text-align: center;
    padding: 25px;
    color: #64748b;
}

</style>

</head>

<body>

<header>

<div class="logo">🚀 TaskFlow</div>

<div>Node.js + Express</div>

</header>

<section class="hero">

<h1>Project Dashboard</h1>

<p>
Manage your development tasks and track your deployment workflow.
</p>

</section>

<section class="dashboard">

<div class="card">

<h2>Today's Tasks</h2>

<ul>
${taskList}
</ul>

<div class="status">

<strong>System Status:</strong> Operational

</div>

<p>
<strong>Server Time:</strong> ${currentTime}
</p>

<p>
<strong>Total Tasks:</strong> ${tasks.length}
</p>

</div>

</section>

<footer>

TaskFlow © 2026 | Running with Node.js + Express

</footer>

</body>

</html>
    `);
});

app.listen(3000, () => {
    console.log("TaskFlow running on port 3000");
});
