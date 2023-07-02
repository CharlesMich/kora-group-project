from flask import Blueprint, request
from app.models import db, Answer
from app.forms import AnswerForm
from flask_login import login_required, current_user

answer_route = Blueprint('answer', __name__)

@answer_route.route('/', methods = ["GET"])
def answerIndex():
    answers = Answer.query.all()
    return [answer.to_dict() for answer in answers]


@answer_route.route('/')


@answer_route.route('/<int:id>', methods = ["GET", "POST"])    
def newanswer(id):
    """
    adds new answer
    """


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
    else:
        return form.errors
    
@answer_route.route('/update-answers/<int:id>', methods = ["Get", "POST"])   
def answerUpdate(id):
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
    return "nothing found"

@answer_route.route('/delete-answers/<int:id>', methods = ["GET", "POST"])

def deleteAnswer(id):
    answer = Answer.query.filter(Answer.id == id).first()
    db.session.delete(answer)
    # question.delete()
    db.session.commit()
    return {"message": "Successfully Deleted"}

