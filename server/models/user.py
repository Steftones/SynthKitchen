from app import db, bcrypt
from models.base import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import jwt
from datetime import *
from config.environment import secret
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from models.song import Song
from models.comment import Comment


class User(db.Model, BaseModel):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    username = db.Column(db.String(15), nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)
    songs = db.relationship('Song', backref='user', cascade="all, delete")
    comments = db.relationship('Comment', backref='user', cascade="all, delete")


    @validates('email')
    def validate_email(self, key, address):
        assert '@' in address
        assert '.' in address
        return address

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        encoded_pw = bcrypt.generate_password_hash(password_plaintext)
        self.password_hash = encoded_pw.decode('utf-8')

    def validate_password(self, password_plaintext):
        return bcrypt.check_password_hash(self.password_hash, password_plaintext)

    def generate_token(self):
        payload = {
            "sub": self.id,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + timedelta(days=1)
        }

        token = jwt.encode(payload, secret, 'HS256')

        return token




