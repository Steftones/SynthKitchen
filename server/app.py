from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.environment import db_URI
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)

from decorators import errors

app.config["DEBUG"] = True
app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# dropdb songs_db
# createdb songs_db

bcrypt = Bcrypt(app)

from controllers import users ###

app.register_blueprint(users.router, url_prefix="/api") ###

@app.route('/api')
def index():
    return { 'message': "Hello, World!" }