from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_questions():
    question1 = Question(
        question='How can I make ice?', owner_id=1, space_id=1
    )
    question2 = Question(
        question='How do I boil an egg?', owner_id=2, space_id=1
    )
    question3 = Question(
        question='Can I die for playing too much videogames?', owner_id=3, space_id=3
    )
    question4 = Question(
        question='Is python an easy language to learn?', owner_id=4, space_id=5
    )
    question5 = Question(
        question='How much will it take me to learn Javascript?', owner_id=5, space_id=5
    )

    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
