from app import db
from models.base import BaseModel
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from models.comment import Comment

class Song(db.Model, BaseModel):

    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    content = db.Column(JSON, nullable=False)
    comments = db.relationship('Comment', backref='song', cascade="all, delete")

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))


    



