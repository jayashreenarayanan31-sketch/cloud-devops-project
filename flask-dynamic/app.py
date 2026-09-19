from flask import Flask
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def home():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Flask Dynamic Website</title>
    </head>
    <body>
        <h1>Welcome to Flask Dynamic Website</h1>
        <p>This website is running using Python Flask and Gunicorn.</p>
        <p>Current server time: {current_time}</p>
        <p>Port: 88</p>
    </body>
    </html>
    """

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
