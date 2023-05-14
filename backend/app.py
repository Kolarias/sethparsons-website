import os, time, hmac, hashlib, threading
from dev_secrets import webhook_secret
from flask import Flask, jsonify, request, Response, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import literal_column, or_, DOUBLE_PRECISION
from sqlalchemy.sql import text, column, desc
from models import app, db, AboutTool, BasicInfo, Institution, Workplace, Project, Skill, Links
from schema import (
    about_tool_schema, basic_info_schema, institution_schema, workplace_schema, project_schema, skill_schema, links_schema
)

# Home page
@app.route("/")
def home():
    return "<h1>Seth Parsons Website API</h1>"

# About page tool data
@app.route("/about")
def about():
    # Query database for about page tool data, return as json
    query = db.session.query(AboutTool)
    result = about_tool_schema.dump(query, many=True)
    return jsonify({"tools": result})

# Resume data
@app.route("/resume")
def resume():
    # Query database for all types of resume data, return it as json
    binfo_query = db.session.query(BasicInfo)
    binfo = basic_info_schema.dump(binfo_query, many=True)
    edu_query = db.session.query(Institution)
    edu = institution_schema.dump(edu_query, many=True)
    proexp_query = db.session.query(Workplace)
    proexp = workplace_schema.dump(proexp_query, many=True)
    proj_query = db.session.query(Project)
    proj = project_schema.dump(proj_query, many=True)
    skills_query = db.session.query(Skill)
    skills = skill_schema.dump(skills_query, many=True)
    return jsonify( {"Basic Info": binfo[0]},
                    {"Education": edu},
                    {"Professional Experience": proexp},
                    {"Projects": proj},
                    {"Key Skills": skills})

# Contact links
@app.route("/contact")
def contact():
    # Return links as json
    query = db.session.query(Links)
    result = links_schema.dump(query, many=True)
    return jsonify({"links": result[0]})

# Webhook (for automatically deploying backend updates)
# idea is from https://clement.notin.org/blog/2021/04/13/auto-deploy-python-flask-web-app-on-github-push/
@app.route("/webhook", methods=['POST'])
def webhook():
    # X-Hub-Signature-256: sha256=<hash>
    sig_header = 'X-Hub-Signature-256'
    if sig_header in request.headers:
        header_splitted = request.headers[sig_header].split("=")
        if len(header_splitted) == 2:
            req_sign = header_splitted[1]
            # hmac apparently needs bytes and not a string
            webhook_bytes = webhook_secret.encode('utf-8')
            computed_sign = hmac.new(webhook_bytes, request.data, hashlib.sha256).hexdigest()
            # is the provided signature ok?
            if hmac.compare_digest(req_sign, computed_sign):
                # create a thread to return a response (so GitHub is happy) and start a 2s timer before exiting this app
                # this is supposed to be run by systemd unit which will restart it automatically
                # the [] syntax for lambda allows to have 2 statements
                threading.Thread(target=lambda: [time.sleep(2), os._exit(-1)]).start()
                return "ok"
    abort(403)

# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
