rom flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/login')
def login():
    return send_from_directory('.', 'login.html')

@app.route('/register')
def register():
    return send_from_directory('.', 'register.html')

@app.route('/profile')
def profile():
    return send_from_directory('.', 'profile.html')

@app.route('/<path:path>')
def static_file(path):
    return send_from_directory('.', path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)