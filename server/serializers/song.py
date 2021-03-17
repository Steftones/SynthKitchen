from app import ma
from models.song import Song
from marshmallow import fields

class SongSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Song
        load_instance = True

    comments = fields.Nested('CommentSchema', many=True)

    user = fields.Nested('SimpleUserSchema')

class SimpleSongSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Song
        load_instance = True