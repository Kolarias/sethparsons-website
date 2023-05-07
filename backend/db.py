import json
import time
from models import app, db, About

def populate_db():
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_about()

def populate_about():
    temp = open("backend_data/about_data.json")
    about_data = json.load(temp)
    temp.close()

    for tool in about_data["results"]:
        db_row = {
            "name": tool["name"],
            "desc": tool["desc"],
            "pic": tool["pic"],
            "link": tool["link"],
        }
        db.session.add(About(**db_row))
        time.sleep(0.1)
    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        populate_db()