from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from secrets import database_link

app = Flask(__name__)
CORS(app)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = database_link
db = SQLAlchemy(app)

class About(db.Model):
    name = db.Column(db.String(100), primary_key=True)
    desc = db.Column(db.String(1000))
    pic = db.Column(db.String(100))
    link = db.Column(db.String(1000))
