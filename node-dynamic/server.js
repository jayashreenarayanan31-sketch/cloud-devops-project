const express = require("express");

const app = express();
app.use(express.json());

let tasks = [
    "Deploy application",
    "Monitor containers",
    "Check server health",
    "Review CI/CD pipeline"
];

// API - Get tasks
app.get("/api/tasks", (req, res) => {
    res.json({
        tasks: tasks,
        count: tasks.length,
        serverTime: new Date().toLocaleString()
    });
});

// API - Add task
app.post("/api/tasks", (req, res) => {
    const task = req.body.task;

    if (!task || task.trim() === "") {
        return res.status(400).json({
            message: "Task cannot be empty"
        });
    }

    tasks.push(task.trim());

    res.json({
        message: "Task added successfully",
        tasks: tasks,
        count: tasks.length
    });
});

// API - Delete task
app.delete("/api/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (index < 0 || index >= tasks.length) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.json({
        message: "Task deleted successfully",
        tasks: tasks,
        count: tasks.length
    });
});

// Main webpage
app.get("/", (req, res) => {

    res.send(`
<!DOCTYPE html>
<html>

<head>

<title>TaskFlow | Node.js Dashboard</title>

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
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.badge {
    background: #16a34a;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 13px;
}

.hero {
    padding: 60px 8%;
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
    padding: 45px 8%;
}

.card {
    background: white;
    max-width: 750px;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.input-area {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

input {
    flex: 1;
    padding: 13px;
    border: 1px solid #cbd5e1;
    border-radius: 7px;
    font-size: 15px;
}

button {
    border: none;
    padding: 12px 18px;
    border-radius: 7px;
    cursor: pointer;
    font-weight: bold;
}

.add-btn {
    background: #2563eb;
    color: white;
}

.delete-btn {
    background: #fee2e2;
    color: #dc2626;
    margin-left: auto;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 13px;
    margin: 8px 0;
    background: #eff6ff;
    border-radius: 7px;
    display: flex;
    align-items: center;
}

.status {
    margin-top: 25px;
    padding: 15px;
    background: #dcfce7;
    color: #166534;
    border-radius: 8px;
}

.info {
    margin-top: 20px;
    display: flex;
    gap: 30px;
    color: #475569;
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

<div class="badge">● Node.js API Connected</div>

</header>

<section class="hero">

<h1>Dynamic Task Dashboard</h1>

<p>
Tasks are managed through a Node.js + Express backend API.
</p>

</section>

<section class="dashboard">

<div class="card">

<h2>Development Tasks</h2>

<div class="input-area">

<input
    id="taskInput"
    type="text"
    placeholder="Enter a new task..."
>

<button class="add-btn" onclick="addTask()">
    + Add Task
</button>

</div>

<ul id="taskList"></ul>

<div class="status">

<strong>System Status:</strong> Operational

</div>

<div class="info">

<div>
<strong>Total Tasks:</strong>
<span id="taskCount">0</span>
</div>

<div>
<strong>Server Time:</strong>
<span id="serverTime">Loading...</span>
</div>

</div>

</div>

</section>

<footer>

TaskFlow © 2026 | Node.js + Express | Dynamic Application

</footer>

<script>

async function loadTasks() {

    const response = await fetch("/api/tasks");
    const data = await response.json();

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    data.tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = \`
            <span>✅ \${task}</span>

            <button
                class="delete-btn"
                onclick="deleteTask(\${index})">
                Delete
            </button>
        \`;

        list.appendChild(li);

    });

    document.getElementById("taskCount").textContent = data.count;
    document.getElementById("serverTime").textContent = data.serverTime;
}

async function addTask() {

    const input = document.getElementById("taskInput");

    const task = input.value.trim();

    if (!task) {
        alert("Please enter a task");
        return;
    }

    await fetch("/api/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            task: task
        })

    });

    input.value = "";

    loadTasks();
}

async function deleteTask(index) {

    await fetch("/api/tasks/" + index, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();

</script>

</body>

</html>
    `);
});

app.listen(3000, () => {
    console.log("TaskFlow running on port 3000");
});
