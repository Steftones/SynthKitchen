from models.user import User
from models.comment import Comment
from models.song import Song

list_users = [
    User(username='Nick', password='nick', email='nick@nick.com'),
    User(username='Deadmau6', password='deadmau6', email='deadmau6@deadmau6.com')
]

list_songs = [
    Song(content={}, user_id=1),
    Song(content={}, user_id=2)
]

list_comments = [
    Comment(content='Great song!', user_id=2, song_id=1),
]