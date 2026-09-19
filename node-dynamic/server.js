const express = require("express");

const app = express();

app.get("/", (req, res) => {
    const currentTime = new Date().toLocaleString();

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Node.js Dynamic Website</title>
        </head>
        <body>
            <h1>Welcome to Node.js Dynamic Website</h1>
            <p>This page is generated dynamically using Node.js and Express.</p>
            <p>Current server time: ${currentTime}</p>
            <p>Port: 86</p>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Node.js application running on port 3000");
});
