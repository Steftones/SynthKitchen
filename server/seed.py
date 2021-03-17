from app import app, db
from data.seed_data import list_users, list_songs, list_comments

with app.app_context():

    try:
        db.drop_all()
        db.create_all()

        db.session.add_all(list_users)
        db.session.commit()
        print("Users seeded")

        db.session.add_all(list_songs)
        db.session.commit()
        print("Songs seeded")

        db.session.add_all(list_comments)
        db.session.commit()
        print("Comments seeded")

        print("Everything committed 🤖")
    except Exception as e:
        print("There was an error.")
        print(e)
