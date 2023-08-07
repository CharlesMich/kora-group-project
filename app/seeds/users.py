from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Mar', last_name='Nie')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bob', last_name='Bie')
    fakie1 = User(
        username='fakeuser1', email='fakeuser1@aa.io', password='password', first_name='Fake', last_name='User1')
    fakie2 = User(
        username='fakeuser2', email='fakeuser2@aa.io', password='password', first_name='Fake', last_name='User2')
    fakie3 = User(
        username='fakeuser3', email='fakeuser3@aa.io', password='password', first_name='Fake', last_name='User3')
    fakie4 = User(
        username='fakeuser4', email='fakeuser4@aa.io', password='password', first_name='Fake', last_name='User4')
    fakie5 = User(
        username='fakeuser5', email='fakeuser5@aa.io', password='password', first_name='Fake', last_name='User5')
    fakie6 = User(
        username='fakeuser6', email='fakeuser6@aa.io', password='password', first_name='Fake', last_name='User6')
    fakie7 = User(
        username='fakeuser7', email='fakeuser7@aa.io', password='password', first_name='Fake', last_name='User7')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(fakie1)
    db.session.add(fakie2)
    db.session.add(fakie3)
    db.session.add(fakie4)
    db.session.add(fakie5)
    db.session.add(fakie6)
    db.session.add(fakie7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
