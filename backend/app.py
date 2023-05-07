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
    return "<h1>Seth Parsons Website API</h1>"

# About page
@app.route("/about")
def about():
    query = db.session.query(About)
    result = about_schema.dump(query, many=True)
    return jsonify({"tools": result})

# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
