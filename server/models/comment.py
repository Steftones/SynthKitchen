from app import db, ma
from models.base import BaseModel
from datetime import datetime

class Comment(db.Model, BaseModel):

    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)

    song_id = db.Column(db.Integer, db.ForeignKey('songs.id', ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
