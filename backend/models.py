from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from flask_cors import CORS
from dev_secrets import database_link

app = Flask(__name__)
CORS(app)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = database_link
db = SQLAlchemy(app)

'''
    Database model for "Tools Used" section of About page.
'''
class AboutTool(db.Model):
    name = db.Column(db.String(100), primary_key=True)
    desc = db.Column(db.String(1000))
    pic = db.Column(db.String(1000))
    link = db.Column(db.String(1000))

'''
    Database models for "Resume" page. Should be self-explanatory.
'''
class BasicInfo(db.Model):
    name = db.Column(db.String(100), primary_key=True)
    address = db.Column(db.String(1000))
    email = db.Column(db.String(100))
    link = db.Column(db.String(1000))
    summary = db.Column(db.String(1000))

class Institution(db.Model):
    name = db.Column(db.String(100), primary_key=True)
    gpa = db.Column(db.String(5))
    classes = db.Column(db.String(1000))
    date = db.Column(db.String(100))

class Workplace(db.Model):
    company = db.Column(db.String(100), primary_key=True)
    title = db.Column(db.String(100))
    points = db.Column(ARRAY(db.String(1000)))
    date = db.Column(db.String(100))

class Project(db.Model):
    name = db.Column(db.String(100), primary_key=True)
    desc = db.Column(db.String(1000))

class Skill(db.Model):
    text = db.Column(db.String(100), primary_key=True)