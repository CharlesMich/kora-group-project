from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_answers():
    answer1 = Answer(
        body='Fill the bottom tray with a couple inches of water. Fit the ice cube molds on top of the bottom tray, fill them with water (regular old tap water is fine!) and place the lid on top. Place the mold in the freezer Remove the ice cube mold from the bottom tray before the whole bottom tray freezes. The sweet spot is typically 16 to 18 hours. Heres why. The unit will freeze from top to bottom (much like the way a lake freezes). As this happens, impurities and air are forced out of the cubes and into the bottom chamber (hello, clear ice). If you let the whole bottom chamber freeze, the air can be forced back into your ice cubes, making cloudy results.', user_id=2, question_id=1
    )
    answer2 = Answer(
        body='Place eggs in the bottom of a saucepan. Be sure not to crowd the eggs in the pan. They should fit comfortably.Fill the pan with cold water, 1 inch above the eggs. Bring the water to a rapid boil on the stovetop over high heat. Once the water comes to a boil, cover the pan with a lid and remove the pan from the heat. Do not lift the lid. Set a timer for the type of boiled egg you want, from 4 minutes to 12 minutes. Fill a large bowl with ice and water. When the eggs reach the desired cooking time, use tongs to remove the eggs from the hot water and immerse gently into the prepared ice water to cool, about 10 minutes. Gently tap the eggs against a hard surface and peel away the shell. Rinse the egg under cold water to remove any bits of shell and pat dry.', user_id=1, question_id=2
    )
    answer3 = Answer(
        body='Video games can be a divisive topic, particularly between parents and children. Parents often view video games as a waste of time and think that no good can come from them. On the other hand, gaming can be a big part of a child’s life and one of their favorite hobbies. But video games aren’t just for kids, and they aren’t a waste of time either.', user_id=1, question_id=3
    )
    answer4 = Answer(
        body='Just like most newbies trying to get into tech, I had difficulties finding the correct path of learning to code. I had to bounce back on forth trying to find a way that was comfortable for me. I began my journey into the tech field by learning first the basics of web development – that is HTML, CSS and a little bit of JavaScript. Later on I tried out different programming languages, all in the name of trying to find the one that suited me perfectly.', user_id=1, question_id=4
    )
    answer5 = Answer(
        body='JavaScript is one of the most common languages for making webpages interactive. Along with HTML and CSS, it’s a must-have web developer skill and is considered standard in web technology. But unlike HTML and CSS, it’s not a language you can ace in a few weeks, or even a few months. So how long does it really take to become a JavaScript expert? Here’s the short answer: most programmers agree that it takes six to nine months to develop a working proficiency in JavaScript. And even then, you’ll spend years learning new skills and developing your understanding of it.', user_id=1, question_id=5
    )
    answer6 = Answer(
        body='Knead the eggs into the flour, adding more flour as necessary to create a smooth, elastic dough If you started with a lot of flour, it may not all work in - the dough knows how much flour it wants there is no point forcing it.Once you have your dough, get out your pasta machine or your rolling pin, whichever you have. If you are using a machine, break off a small bit of dough, perhaps the size of a ping pong ball, then roll it at the widest setting. fold it in half, then run it through a few more times until it rolls smoothly. You may need to add more flour during this process.', user_id=2, question_id=6
    )
    answer7 = Answer(
        body='Some popular and delicious ways to cook chicken include grilling, baking, sautéing, and frying. Each method offers a unique texture and flavor profile, allowing you to choose based on your preferences and the specific recipe you are working with.', user_id=3, question_id=7
    )
    answer8 = Answer(
        body='Thaw the frozen broccoli florets by either transferring them to the refrigerator overnight or blanching them in boiling water for a couple of minutes. Drain well. In a large pot, heat the olive oil over medium heat. Add the diced onion and minced garlic, and sauté until they become soft and translucent', user_id=4, question_id=8
    )
    answer9 = Answer(
        body='You don’t need culinary school. You don’t need expensive equipment. You don’t even need that much experience. All you need to be a better cook today is a little bit of knowledge. Or, in the case of this list, 57 little bits. By doing. You can learn a lot by reading cookbooks, watching web videos, Food Network shows and friends, but the only way to actually get good is to practice. Start out by choosing simple recipes that focus on ingredients you like, and to master it, make it at least three times in a short period. ', user_id=5, question_id=9
    )
    answer10 = Answer(
        body='Answer: A planet is a celestial body that orbits a star and is massive enough for its self-gravity to overcome rigid body forces so that it assumes a hydrostatic equilibrium (nearly round) shape. A star is a self-luminous ball of plasma held together by gravity.', user_id=1, question_id=10
    )
    answer11 = Answer(
        body='The Milky Way is the galaxy that contains our solar system. It is a spiral galaxy, with a central bulge and four spiral arms. The Milky Way is about 100,000 light-years across and contains billions of stars. ', user_id=3, question_id=11
    )
    answer12 = Answer(
        body='A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape. Black holes are formed when massive stars collapse at the end of their lives. ', user_id=4, question_id=12
    )
    answer13 = Answer(
        body='The Big Bang is the prevailing cosmological model for the universe. It states that the universe was once in an extremely hot and dense state that expanded rapidly. The Big Bang is thought to have occurred about 13.8 billion years ago. ', user_id=5, question_id=13
    )
    answer14 = Answer(
        body=' Dark matter is a mysterious substance that makes up about 85% of the matter in the universe. We cannot see dark matter, but we can infer its existence from its gravitational effects on visible matter. ', user_id=6, question_id=14
    )
    answer15 = Answer(
        body='A continent is a large landmass, while a country is a political unit within a continent. There are seven continents in the world: Africa, Asia, Australia, Europe, North America, South America, and Antarctica. There are 195 countries in the world.', user_id=7, question_id=15
    )
    answer16 = Answer(
        body='The highest mountain in the world is Mount Everest, which is located in the Himalayas between Nepal and China. Mount Everest is 29,031 feet (8,848 meters) tall.', user_id=8, question_id=16
    )
    answer17 = Answer(
        body='The largest desert in the world is the Sahara Desert, which is located in North Africa. The Sahara Desert is about 3.5 million square miles (9.1 million square kilometers) in size.', user_id=9, question_id=17
    )
    answer18 = Answer(
        body='The longest river in the world is the Nile River, which is located in Africa. The Nile River is about 4,132 miles (6,650 kilometers) long.', user_id=10, question_id=18
    )
    answer19 = Answer(
        body='The worlds most populous country is China, with a population of over 1.4 billion people. China is located in East Asia.', user_id=1, question_id=19
    )
    answer20 = Answer(
        body='A stock market is a place where people can buy and sell shares of ownership in companies. The stock market is a vital part of the global economy, as it allows businesses to raise capital and investors to make money.', user_id=5, question_id=20
    )
    answer21 = Answer(
        body='There are two main types of stocks: common stocks and preferred stocks. Common stocks give investors the right to vote on corporate decisions and to receive dividends, if any. Preferred stocks give investors a priority claim on dividends, but they do not have voting rights.', user_id=6, question_id=21
    )
    answer22 = Answer(
        body='A stock exchange is a marketplace where stocks are traded. The most famous stock exchange in the world is the New York Stock Exchange (NYSE). The NYSE is located in New York City and is the largest stock exchange in the world by market capitalization.', user_id=7, question_id=22
    )
    answer23 = Answer(
        body='You can buy stocks through a brokerage firm. A brokerage firm is a company that facilitates the buying and selling of stocks. To buy stocks, you will need to open a brokerage account and deposit money into the account. You can then use the money to buy stocks.', user_id=8, question_id=23
    )
    answer24 = Answer(
        body='There are two main risks of investing in stocks: the risk of losing money and the risk of volatility. The risk of losing money is the possibility that the stock price will go down and you will lose money on your investment. The risk of volatility is the possibility that the stock price will go up and down rapidly, which can make it difficult to time your trades.', user_id=9, question_id=24
    )
    answer25 = Answer(
        body='The Battle of Hastings was a significant event in English history because it marked the end of the Anglo-Saxon period and the beginning of the Norman period. The battle was fought on October 14, 1066, between the forces of Harold Godwinson, the last Anglo-Saxon king of England, and William the Conqueror, the Duke of Normandy. William won the battle, and became the new king of England.', user_id=10, question_id=25
    )
    answer26 = Answer(
        body='The Magna Carta was a document signed by King John of England in 1215. The Magna Carta was a major step forward in the development of English law, as it limited the power of the king and established the principle that the king was subject to the law. The Magna Carta is considered to be one of the most important documents in English history.', user_id=1, question_id=26
    )
    answer27 = Answer(
        body='The Renaissance was a period of European history that began in Italy in the 14th century and spread to the rest of Europe in the 15th and 16th centuries. The Renaissance was a time of great cultural and intellectual change, as people began to rediscover the classical learning of ancient Greece and Rome. The Renaissance also saw the development of new art, literature, and science.', user_id=2, question_id=27
    )
    answer28 = Answer(
        body='The Industrial Revolution was a period of great economic and social change that began in Great Britain in the late 18th century and spread to other parts of the world in the 19th century. The Industrial Revolution was characterized by the introduction of new machines and technologies, which led to a dramatic increase in the production of goods. The Industrial Revolution also had a profound impact on society, as it led to the growth of cities, the rise of a new working class, and the development of new social and political movements.', user_id=3, question_id=28
    )
    answer29 = Answer(
        body='The Cold War was a period of political and military tension between the United States and the Soviet Union and their respective allies that lasted from the end of World War II in 1945 until the collapse of the Soviet Union in 1991. The Cold War was characterized by the threat of nuclear war, the development of new weapons technologies, and the spread of communism to other parts of the world.', user_id=4, question_id=29
    )
    answer30 = Answer(
        body='Residential real estate: This includes single-family homes, condominiums, townhouses, and apartments. Commercial real estate: This includes office buildings, retail stores, warehouses, and hotels. Industrial real estate: This includes factories, warehouses, and distribution centers.Land: This includes vacant land, agricultural land, and undeveloped land.', user_id=5, question_id=30
    )
    answer31 = Answer(
        body='Location: The location of a property is one of the most important factors affecting its value. Properties in desirable locations, such as near schools, parks, or shopping, tend to be more valuable than properties in less desirable locations. Demand: The demand for real estate also affects its value. If there is a high demand for properties in a particular area, the prices will tend to be higher. Supply: The supply of real estate also affects its value. If there is a limited supply of properties in a particular area, the prices will tend to be higher. Condition: The condition of a property also affects its value. Properties that are in good condition tend to be more valuable than properties that are in poor condition.', user_id=7, question_id=31
    )
    answer32 = Answer(
        body='Conventional mortgage: This is the most common type of mortgage. It is a loan that is secured by the property being purchased. FHA loan: This is a government-backed loan that is available to borrowers with lower credit scores. VA loan: This is a government-backed loan that is available to veterans and active-duty military personnel. USDA loan: This is a government-backed loan that is available to borrowers who purchase homes in rural areas. Home equity loan: This is a loan that is secured by the equity in your home.', user_id=8, question_id=32
    )
    answer33 = Answer(
        body='Rental properties: This is the most common type of real estate investment. You purchase a property and rent it out to tenants. Flipping properties: This is where you purchase a property, renovate it, and then sell it for a profit. Wholesaling properties: This is where you find a property that is underpriced, and then you sell the contract to another investor for a profit. Real estate investment trusts (REITs): This is a type of investment fund that invests in real estate.', user_id=9, question_id=33
    )
    answer34 = Answer(
        body='Pre-qualification: This is where you get pre-approved for a mortgage. Finding a property: This is where you start looking for properties that meet your needs and budget. Making an offer: This is where you submit an offer to the seller. Negotiating the offer: This is where you and the seller negotiate the terms of the sale. Closing: This is where you sign all the paperwork and the property becomes yours.', user_id=10, question_id=34
    )

    



    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    db.session.add(answer4)
    db.session.add(answer5)
    db.session.add(answer6)
    db.session.add(answer7)
    db.session.add(answer8)
    db.session.add(answer9)
    db.session.add(answer10)
    db.session.add(answer11)
    db.session.add(answer12)
    db.session.add(answer13)
    db.session.add(answer14)
    db.session.add(answer15)
    db.session.add(answer16)
    db.session.add(answer17)
    db.session.add(answer18)
    db.session.add(answer19)
    db.session.add(answer20)
    db.session.add(answer21)
    db.session.add(answer22)
    db.session.add(answer23)
    db.session.add(answer24)
    db.session.add(answer25)
    db.session.add(answer26)
    db.session.add(answer27)
    db.session.add(answer28)
    db.session.add(answer29)
    db.session.add(answer30)
    db.session.add(answer31)
    db.session.add(answer32)
    db.session.add(answer33)
    db.session.add(answer34)
    
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
