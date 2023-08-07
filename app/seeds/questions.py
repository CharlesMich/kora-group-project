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
        question='How much time will it take me to learn Javascript?', owner_id=5, space_id=5
    )
    question6 = Question(
        question='What is the best way to make pasta from scratch?', owner_id=1, space_id=1
    )
    question7 = Question(
        question='What are the best ways to cook chicken?', owner_id=1, space_id=1
    )
    question8 = Question(
        question='How can you make broccoli soup from frozen broccoli florets?', owner_id=1, space_id=1
    )
    question9 = Question(
        question='How do I learn to cook?', owner_id=2, space_id=1
    )
    question10 = Question(
        question='What is the difference between a planet and a star?', owner_id=2, space_id=6
    )
    question11 = Question(
        question=' What is the Milky Way?', owner_id=2, space_id=6
    )
    question12 = Question(
        question='What is a black hole?', owner_id=2, space_id=6
    )
    question13 = Question(
        question='What is the Big Bang?', owner_id=2, space_id=6
    )
    question14 = Question(
        question='What is dark matter?', owner_id=2, space_id=6
    )
    question15 = Question(
        question= 'What is the difference between a continent and a country?', owner_id=3, space_id=8
    )
    question16 = Question(
        question='What is the highest mountain in the world?', owner_id=3, space_id=8
    )
    question17 = Question(
        question='What is the largest desert in the world?', owner_id=3, space_id=8
    )
    question18 = Question(
        question='What is the longest river in the world?', owner_id=3, space_id=8
    )
    question19 = Question(
        question=' What is the worlds most populous country?', owner_id=3, space_id=8
    )
    question20 = Question(
        question='What is a stock market?', owner_id=4, space_id=9
    )
    question21 = Question(
        question='What are the different types of stocks?', owner_id=4, space_id=9
    )
    question22 = Question(
        question='What is a stock exchange?', owner_id=4, space_id=9
    )
    question23 = Question(
        question='How do I buy stocks?', owner_id=4, space_id=9
    )
    question24 = Question(
        question='What are the risks of investing in stocks?', owner_id=4, space_id=9
    )
    question25 = Question(
        question='What was the significance of the Battle of Hastings?', owner_id=5, space_id=7
    )
    question26 = Question(
        question='What was the Magna Carta?', owner_id=5, space_id=7
    )
    question27 = Question(
        question='What was the Renaissance?', owner_id=5, space_id=7
    )
    question28 = Question(
        question=' What was the Industrial Revolution?', owner_id=5, space_id=7
    )
    question29 = Question(
        question='What was the Cold War?', owner_id=5, space_id=7
    )
    question30 = Question(
        question='What are the different types of real estate?', owner_id=6, space_id=10
    )
    question31 = Question(
        question='What are the factors that affect the value of real estate?', owner_id=6, space_id=10
    )
    question32 = Question(
        question='What are the different ways to finance a real estate purchase?', owner_id=6, space_id=10
    )
    question33 = Question(
        question=' What are the different types of real estate investment?', owner_id=6, space_id=10
    )
    question34 = Question(
        question=' What are the different stages of the real estate buying process?', owner_id=6, space_id=10
    )
    question35 = Question(
        question='What is the name of the first gasoline-powered car?', owner_id=6, space_id=11
    )
    question36 = Question(
        question='What is the most popular car model in the world?', owner_id=7, space_id=11
    )
    question37 = Question(
        question='What is the name of the first car to travel over 100 miles per hour?', owner_id=8, space_id=11
    )
    question38 = Question(
        question='How long did it take for the Ford Model T to be produced on assembly line?', owner_id=9, space_id=11
    )
    question39 = Question(
        question='What is the difference between a 4-cylinder and a 6-cylinder engine?', owner_id=10, space_id=11
    )
    question40 = Question(
        question='What is the purpose of a cars differential?', owner_id=2, space_id=11
    )
    question41 = Question(
        question='What is the meaning of the term "horsepower"?', owner_id=3, space_id=11
    )
    question42 = Question(
        question='What is the difference between a manual transmission and an automatic transmission?', owner_id=4, space_id=11
    )
    question43 = Question(
        question='What are the three main types of car brakes?', owner_id=5, space_id=11
    )
    question44 = Question(
        question='What is the difference between a hybrid car and an electric car?', owner_id=6, space_id=11
    )


    

   
    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.add(question11)
    db.session.add(question12)
    db.session.add(question13)
    db.session.add(question14)
    db.session.add(question15)
    db.session.add(question16)
    db.session.add(question17)
    db.session.add(question18)
    db.session.add(question19)
    db.session.add(question20)
    db.session.add(question21)
    db.session.add(question22)
    db.session.add(question23)
    db.session.add(question24)
    db.session.add(question25)
    db.session.add(question26)
    db.session.add(question27)
    db.session.add(question28)
    db.session.add(question29)
    db.session.add(question30)
    db.session.add(question31)
    db.session.add(question32)
    db.session.add(question33)
    db.session.add(question34)
    db.session.add(question35)
    db.session.add(question36)
    db.session.add(question37)
    db.session.add(question38)
    db.session.add(question39)
    db.session.add(question40)
    db.session.add(question41)
    db.session.add(question42)
    db.session.add(question43)
    db.session.add(question44)
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
