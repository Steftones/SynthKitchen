from app import ma
from models.comment import Comment
from marshmallow import fields

class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        load_instance = True
    user = fields.Nested('SimpleUserSchema')