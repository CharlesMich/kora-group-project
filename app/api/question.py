from flask import Blueprint, request
from app.models import db, Question
from app.forms import QuestionForm
from flask_login import login_required

question_route = Blueprint('question', __name__)


@question_route.route('/', methods = ["GET"])
   
# @login_required
def questionIndex():
    """
       view all questions
    """
    questions = Question.query.all()
    return [question.to_dict() for question in questions]
    # return {'questions': [question.question for question in questions]}

@question_route.route('/new-question', methods = ["GET", "POST"])    
def newquestion():
    """
    adds new question
    """

    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        newQuestion = Question(
            question = data['question'],
            owner_id = data['owner_id'],
            tag_id = data['tag_id']
        )

        db.session.add(newQuestion)
        db.session.commit()
        return newQuestion.to_dict()
    else:
        return form.errors

@question_route.route('/update-question/<int:id>', methods = ["GET", "POST"])
def updateQuestion(id):
    # form['csrf_token'].data = request.cookies['csrf_token']
    print(id)
    question = Question.query.filter(Question.id == id)
    if request.method == "POST":

        print('question',question)
        data = request.get_json()
        print('data',data)
        new_question_text = data.get('question')
        question.question = new_question_text
        print('quesion.question', question.question, new_question_text )
        db.session.commit()
        return "test"
    return "nothing found"

@question_route.route('/delete-question/<int:id>', methods = ["GET", "POST"])
def deleteQuestion(id):

    question = Question.query.filter(Question.id == id)
    db.session.delete(question)
    # question.delete()
    db.session.commit()
    return {"message": "Successfully Deleted"}



    


