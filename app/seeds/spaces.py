from app.models import db, Space, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_spaces():
    spaces1 = Space(
        space_name='Cooking', description='Learn about Cooking'
    )
    spaces2 = Space(
        space_name='Sports', description='Learn about Sports'
    )
    spaces3 = Space(
        space_name='Video Games', description='Learn about Video Games'
    )
    spaces4 = Space(
        space_name='Travel', description='Learn about Travel'
    )
    spaces5 = Space(
        space_name='Computers', description='Learn about Computers'
    )
    spaces6 = Space(
        space_name='Astronomy', description='Learn about Space and Astronomy'
    )
    spaces7 = Space(
        space_name='History', description='Learn about History'
    )
    spaces8 = Space(
        space_name='Geography', description='Learn about Geography'
    )
    spaces9 = Space(
        space_name='Stock Market', description='Learn about the Stock Market'
    )
    spaces10 = Space(
        space_name='Real Estate', description='Learn about Real Estate'
    )
    spaces11 = Space(
        space_name='Cars', description='Learn about cars'
    )


    db.session.add(spaces1)
    db.session.add(spaces2)
    db.session.add(spaces3)
    db.session.add(spaces4)
    db.session.add(spaces5)
    db.session.add(spaces6)
    db.session.add(spaces7)
    db.session.add(spaces8)
    db.session.add(spaces9)
    db.session.add(spaces10)
    db.session.add(spaces11)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_spaces():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.spaces RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spaces"))

    db.session.commit()
