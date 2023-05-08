import os, time, hmac, hashlib, threading
from secrets import webhook_secret
from flask import Flask, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import literal_column, or_, DOUBLE_PRECISION
from sqlalchemy.sql import text, column, desc
from models import app, db, About
from schema import (
    about_schema
)

# Home page
@app.route("/")
def home():
    return "<h1>Seth Parsons Website API (now automatic!)</h1>"

# About page
@app.route("/about", methods=['POST'])
def about():
    query = db.session.query(About)
    result = about_schema.dump(query, many=True)
    return jsonify({"tools": result})

# Webhook (for automatically deploying backend updates)
# idea is from https://clement.notin.org/blog/2021/04/13/auto-deploy-python-flask-web-app-on-github-push/
@app.route("/webhook")
def webhook():
    # X-Hub-Signature-256: sha256=<hash>
    sig_header = 'X-Hub-Signature-256'
    if sig_header in request.headers:
        header_splitted = request.headers[sig_header].split("=")
        if len(header_splitted) == 2:
            req_sign = header_splitted[1]
            computed_sign = hmac.new(webhook_secret, request.data, hashlib.sha256).hexdigest()
            # is the provided signature ok?
            if hmac.compare_digest(req_sign, computed_sign):
                # create a thread to return a response (so GitHub is happy) and start a 2s timer before exiting this app
                # this is supposed to be run by systemd unit which will restart it automatically
                # the [] syntax for lambda allows to have 2 statements
                threading.Thread(target=lambda: [time.sleep(2), os.system('sudo systemctl restart myapp')]).start()
    return "ok"

# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
