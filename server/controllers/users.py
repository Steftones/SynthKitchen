from flask import Blueprint, request, g
from serializers.user import UserSchema
from serializers.comment import CommentSchema
from serializers.song import SongSchema
from serializers.song import SimpleSongSchema
from marshmallow.exceptions import ValidationError
from models.user import User
from models.song import Song
from models.comment import Comment
from decorators.secure_route import secure_route

user_schema = UserSchema()
song_schema = SongSchema()
comment_schema = CommentSchema()

router = Blueprint(__name__, "users")

# comments
@router.route("/comments", methods=["GET"])
def get_all_comments():
    comments = Comment.query.all()
    return comment_schema.jsonify(comments, many=True), 200

@router.route("/songs/<int:song_id>/comments", methods=["POST"])
@secure_route
def create_comment(song_id):
    song = Song.query.get(song_id)
    if not song:
        return { 'message': 'song not found' }, 404
    try:
        comment = comment_schema.load(request.json)
        comment.song = song
        comment.user = g.current_user
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    comment.save()
    return comment_schema.jsonify(comment)

@router.route("/songs/<int:song_id>/comments/<int:comment_id>", methods=["DELETE"])
@secure_route
def remove_comment(song_id, comment_id):
    comment = Comment.query.get(comment_id)
    comment.remove()
    song = Song.query.get(song_id)
    return song_schema.jsonify(song), 202


@router.route("/songs/<int:song_id>/comments/<int:comment_id>", methods=["PUT"])
def update_comment(song_id, comment_id):
    comment_dictionary = request.json
    existing_comment = Comment.query.get(comment_id)
    try:
        comment = comment_schema.load(
            comment_dictionary, instance=existing_comment, partial=True
        )
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    comment.save()
    song = Song.query.get(song_id)
    return song_schema.jsonify(song), 201

# Songs
@router.route("/songs", methods=["GET"])
def get_all_songs():
    songs = Song.query.all()
    return song_schema.jsonify(songs, many=True), 200

@router.route("/songs/<int:song_id>", methods=["GET"])
def get_single_song(song_id):
    song = Song.query.get(song_id)
    if not song:
        return { 'message': 'song not found' }, 404
    return song_schema.jsonify(song), 200

@router.route("/users/<int:user_id>/songs", methods=["POST"])
@secure_route
def post_song(user_id):
    try:
        user = User.query.get(user_id)
        if user != g.current_user:
            return { "error": "you're not the user" }
        song = song_schema.load(request.json)
        song.user = user
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    song.save()
    return song_schema.jsonify(song)

@router.route("/users/<int:user_id>/songs/<int:song_id>", methods=["DELETE"])
@secure_route
def delete_song(user_id, song_id):
    try:
        user = User.query.get(user_id)
        if user != g.current_user:
            return { "error": "you're not the user" }
        if not user:
            return { 'error': 'user not found' }, 404
        song = Song.query.get(song_id)
        if not song:
            return { 'error': 'this song doesnt exist' }, 404
    except:
        return { 'error': 'something went wrong' }, 404
    song.remove()
    return { 'message': 'song deleted successfully' }, 200

@router.route("/users/<int:user_id>/songs/<int:song_id>", methods=["PUT"])
@secure_route
def put_song(user_id, song_id):
    user = User.query.get(user_id)
    if not user:
        return { 'message': 'user not found' }, 404
    song = Song.query.get(song_id)
    if not song:
        return { 'message': 'song not found' }, 404
    try:
        song = song_schema.load(
            request.json,
            instance=song,
            partial=True
        )
        song.save()
    except ValidationError:
        return { 'error': 'validation error - something went wrong' }, 404
    except:
        return { 'error': 'something went wrong' }, 404
    return song_schema.jsonify(song), 201

# users
@router.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200

@router.route("/users/<int:user_id>", methods=["GET"])
def get_single_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return { 'message': 'user not found' }, 404
    return user_schema.jsonify(user), 200

@router.route("/register", methods=["POST"])
def register():
    try:
        user = user_schema.load(request.json)
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }
    user.save()
    return user_schema.jsonify(user)

@router.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(email=request.json['email']).first()
    if not user:
        return { 'message': 'No user found for this email' }, 404
    if not user.validate_password(request.json['password']):
        return { 'message' : 'You are not authorized' }, 402
    token = user.generate_token()
    return { 'token': token, 'message': 'Welcome back!' }

@router.route('/profile', methods=['GET'])
@secure_route
def get_user_profile():
    return user_schema.jsonify(g.current_user)

@router.route("/users/<int:user_id>", methods=["PUT"])
@secure_route
def put_single_user(user_id):
    existing_user = User.query.get(user_id)
    if not existing_user:
        return { 'message': 'user not found' }, 404
    try:
        user = user_schema.load(
            request.json,
            instance=existing_user,
            partial=True
        )
        user.save()
    except ValidationError:
        return { 'error': 'validation error - something went wrong' }, 404
    except:
        return { 'error': 'something went wrong' }, 404
    return user_schema.jsonify(user), 201

@router.route("/users/<int:user_id>", methods=["DELETE"])
@secure_route
def delete_user(user_id):
    try:
        existing_user = User.query.get(user_id)
        if existing_user != g.current_user:
            return { "error": "you're not the user" }
        if not existing_user:
            return { 'error': 'user not found' }, 404
    except:
        return { 'error': 'something went wrong' }, 404
    existing_user.remove()
    return { 'message': 'user deleted successfully' }, 200

