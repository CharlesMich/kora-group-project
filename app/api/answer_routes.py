from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from app.models import db, Answer
from app.forms import AnswerForm
from flask_login import login_required, current_user

answer_route = Blueprint('answer', __name__)
      
# GET ALL ANSWERS FOR A QUESTION
@answer_route.route('/question/<int:id>', methods = ["GET"])
def answerIndex(id):
    """
    gets all answers
    """
    answers = Answer.query.filter(Answer.question_id == id).all()
    return [answer.to_dict() for answer in answers]



# GET ANSWER BY ANSWER ID
@answer_route.route('/<int:id>', methods = ["GET"])
def getAnswerByID(id):
        answers = Answer.query.filter(Answer.id == id).first()
        return answers.to_dict()

# GET ALL ANSWERS BY USERID
@answer_route.route('/user/<int:id>', methods = ["GET"])
def getAnswerByUserID(id):
        answers = Answer.query.filter(Answer.user_id == id).all()
        return [answer.to_dict() for answer in answers]


# CREATE NEW ANSWER
@answer_route.route('/new/<int:id>', methods = ["GET", "POST"])    
def newanswer(id):
    if request.method == "POST": 
        # userId = current_user.id
        # print('userid', userId)
        form = AnswerForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        data = form.data
        print('data', data)
        if form.validate_on_submit():
            newAnswer = Answer(
                body = data['body'],
                user_id = data['user_id'],
                question_id = data['question_id']
            )

            db.session.add(newAnswer)
            db.session.commit()
            return newAnswer.to_dict()
    # else:
    #     return form.errors
    



    
@answer_route.route('/update-answers/<int:id>', methods = ["GET", "POST"])   
def answerUpdate(id):
    """

    """
    # form['csrf_token'].data = request.cookies['csrf_token']
    # print(id)
    answer = Answer.query.filter(Answer.id == id).first()
    if request.method == "POST":

        print('answer',answer)
        data = request.get_json()
        print('data',data)
        new_answer_text = data.get('body')
        # print('question', question)
        answer.body = new_answer_text
        print('answer.body', new_answer_text )
        db.session.commit()
        return answer.to_dict()
    return 

@answer_route.route('/delete-answers/<int:id>', methods = ["GET", "POST"])

def deleteAnswer(id):
    answer = Answer.query.filter(Answer.id == id).first()
    db.session.delete(answer)
    # question.delete()
    db.session.commit()
    return {"message": "Successfully Deleted"}
