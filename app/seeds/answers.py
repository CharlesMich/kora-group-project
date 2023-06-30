from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_answers():
    answer1 = Answer(
        body='Fill up a plastic cup with water and place it in your freezer, and there you got yourself ice', user_id=2, question_id=1
    )
    answer2 = Answer(
        body='Put two cups of water in a pot, let the water boild and place the eggs in the boiling water for 7 minutes', user_id=3, question_id=2
    )
    answer3 = Answer(
        body='Playing the game is not what kills you but being seated for a log time can create clogs in some places in your body', user_id=3, question_id=2
    )

    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()
