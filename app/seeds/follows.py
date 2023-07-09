from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_followers():
    follow1 = Follow(
        following_user_id=1, followed_user_id=2
    )
    follow2 = Follow(
        following_user_id=2, followed_user_id=3
    )
    follow3 = Follow(
        following_user_id=3, followed_user_id=1
    )
    follow4 = Follow(
        following_user_id=4, followed_user_id=5
    )
    follow5 = Follow(
        following_user_id=5, followed_user_id=4
    )

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.add(follow5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_followers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
