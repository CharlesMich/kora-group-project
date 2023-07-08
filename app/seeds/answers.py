from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_answers():
    answer1 = Answer(
        body='Fill the bottom tray with a couple inches of water. Fit the ice cube molds on top of the bottom tray, fill them with water (regular old tap water is fine!) and place the lid on top. Place the mold in the freezer Remove the ice cube mold from the bottom tray before the whole bottom tray freezes. The sweet spot is typically 16 to 18 hours. Heres why. The unit will freeze from top to bottom (much like the way a lake freezes). As this happens, impurities and air are forced out of the cubes and into the bottom chamber (hello, clear ice). If you let the whole bottom chamber freeze, the air can be forced back into your ice cubes, making cloudy results.', user_id=1, question_id=1
    )
    answer2 = Answer(
        body='Place eggs in the bottom of a saucepan. Be sure not to crowd the eggs in the pan. They should fit comfortably.Fill the pan with cold water, 1 inch above the eggs. Bring the water to a rapid boil on the stovetop over high heat. Once the water comes to a boil, cover the pan with a lid and remove the pan from the heat. Do not lift the lid. Set a timer for the type of boiled egg you want, from 4 minutes to 12 minutes. Fill a large bowl with ice and water. When the eggs reach the desired cooking time, use tongs to remove the eggs from the hot water and immerse gently into the prepared ice water to cool, about 10 minutes. Gently tap the eggs against a hard surface and peel away the shell. Rinse the egg under cold water to remove any bits of shell and pat dry.', user_id=2, question_id=2
    )
    answer3 = Answer(
        body='Video games can be a divisive topic, particularly between parents and children. Parents often view video games as a waste of time and think that no good can come from them. On the other hand, gaming can be a big part of a child’s life and one of their favorite hobbies. But video games aren’t just for kids, and they aren’t a waste of time either.', user_id=3, question_id=3
    )
    answer4 = Answer(
        body='Just like most newbies trying to get into tech, I had difficulties finding the correct path of learning to code. I had to bounce back on forth trying to find a way that was comfortable for me. I began my journey into the tech field by learning first the basics of web development – that is HTML, CSS and a little bit of JavaScript. Later on I tried out different programming languages, all in the name of trying to find the one that suited me perfectly.', user_id=4, question_id=4
    )
    answer5 = Answer(
        body='JavaScript is one of the most common languages for making webpages interactive. Along with HTML and CSS, it’s a must-have web developer skill and is considered standard in web technology. But unlike HTML and CSS, it’s not a language you can ace in a few weeks, or even a few months. So how long does it really take to become a JavaScript expert? Here’s the short answer: most programmers agree that it takes six to nine months to develop a working proficiency in JavaScript. And even then, you’ll spend years learning new skills and developing your understanding of it.', user_id=5, question_id=5
    )

    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    db.session.add(answer4)
    db.session.add(answer5)
    
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
