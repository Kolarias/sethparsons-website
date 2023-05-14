from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import AboutTool, BasicInfo, Institution, Workplace, Project, Skill, Links

mm = Marshmallow()

class AboutToolSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = AboutTool

class BasicInfoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = BasicInfo

class InstitutionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Institution

class WorkplaceSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Workplace

class ProjectSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Project

class SkillSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Skill

class LinksSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Links

about_tool_schema = AboutToolSchema()
basic_info_schema = BasicInfoSchema()
institution_schema = InstitutionSchema()
workplace_schema = WorkplaceSchema()
project_schema = ProjectSchema()
skill_schema = SkillSchema()
links_schema = LinksSchema()
