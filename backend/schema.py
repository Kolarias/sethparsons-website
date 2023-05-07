from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import About

mm = Marshmallow()

class AboutSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = About

about_schema = AboutSchema()
