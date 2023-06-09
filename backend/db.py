import json
from models import app, db, AboutTool, BasicInfo, Institution, Workplace, Project, Skill, Links, ProjectInstance, HobbyInstance

def populate_db():
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_about()
        populate_resume()
        populate_projects()
        populate_hobbies()
        populate_contact()

def populate_about():
    temp = open("backend_data/about_data.json")
    about_data = json.load(temp)
    temp.close()

    # go through all returned tool results and commit to db
    for tool in about_data["results"]:
        db_row = {
            "name": tool["name"],
            "desc": tool["desc"],
            "pic": tool["pic"],
            "link": tool["link"],
        }
        db.session.add(AboutTool(**db_row))
    db.session.commit()

def populate_projects():
    temp = open("backend_data/project_data.json")
    project_data = json.load(temp)
    temp.close()
    id = 1

    # go through all returned project results and commit to db
    # use incrementing integer for id numbers
    for project in project_data["results"]:
        db_row = {
            "id": id,
            "name": project["name"],
            "desc": project["desc"],
            "link": project["link"],
            "pics": project["pics"]
        }
        db.session.add(ProjectInstance(**db_row))
        id += 1
    db.session.commit()

def populate_hobbies():
    temp = open("backend_data/hobby_data.json")
    hobby_data = json.load(temp)
    temp.close()
    id = 1

    # go through all returned project results and commit to db
    # use incrementing integer for id numbers
    for hobby in hobby_data["results"]:
        db_row = {
            "id": id,
            "name": hobby["name"],
            "desc": hobby["desc"],
            "pics": hobby["pics"]
        }
        db.session.add(HobbyInstance(**db_row))
        id += 1
    db.session.commit()

def populate_resume():
    temp = open("backend_data/resume_data.json")
    resume_data = json.load(temp)
    temp.close()

    # quick aliases for each section of my resume data
    # hardcoded, but that's reasonable since I control everything
    binfo = resume_data["sections"]["Basic Info"]
    edu = resume_data["sections"]["Education"]
    proexp = resume_data["sections"]["Professional Experience"]
    proj = resume_data["sections"]["Projects"]
    skills = resume_data["sections"]["Key Skills"]

    # Go through all resume sections and commit data for each one
    basic_info = {
        "name": binfo["name"],
        "title": binfo["title"],
        "address": binfo["address"],
        "email": binfo["email"],
        "link": binfo["link"],
        "summary": binfo["summary"],
    }
    db.session.add(BasicInfo(**basic_info))

    for result in edu["institutions"]:
        school = {
            "name": result["name"],
            "date": result["date"],
            "gpa": result["gpa"],
            "classes": result["classes"]
        }
        db.session.add(Institution(**school))
    
    for result in proexp["workplaces"]:
        work = {
            "company": result["company"],
            "title": result["title"],
            "date": result["date"],
            "points": result["points"]
        }
        db.session.add(Workplace(**work))
    
    for result in proj["projects"]:
        project = {
            "name": result["name"],
            "desc": result["desc"]
        }
        db.session.add(Project(**project))

    for result in skills["skills"]:
        skill = {
            "text": result
        }
        db.session.add(Skill(**skill))

    # Commit all to database
    db.session.commit()

def populate_contact():
    temp = open("backend_data/contact_data.json")
    contact_data = json.load(temp)
    temp.close()

    # put all contact links in database
    db_row = {
        "email": contact_data["email"],
        "linkedin": contact_data["linkedin"],
        "github": contact_data["github"],
        "facebook": contact_data["facebook"],
        "youtube": contact_data["youtube"]
    }
    db.session.add(Links(**db_row))
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        populate_db()