from flask import Blueprint, request
from app.models import db, Question, Tag
from app.forms import QuestionForm
from flask_login import login_required, current_user
from sqlalchemy import func

question_route = Blueprint('question', __name__)


@question_route.route('/', methods = ["GET"])
# @login_required
def questionIndex():
    """
       view all questions
    """
    questions = Question.query.all()
    print(questions[0].question_user)
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
            owner_id = current_user.id
        )

        tag_name = data['tag'].lower()
        tag = Tag.query.filter(func.lower(Tag.tag_name) == tag_name).first()
        if tag:
            newQuestion.tag_id = tag.id
        else:
            new_tag = Tag(tag_name=tag_name.title())
            db.session.add(new_tag)
            db.session.commit()
            newQuestion.tag_id = new_tag.id

        db.session.add(newQuestion)
        db.session.commit()
        return newQuestion.to_dict()
    else:
        return form.errors

@question_route.route('/update-question/<int:id>', methods = ["GET", "POST"])
def updateQuestion(id):
    # form['csrf_token'].data = request.cookies['csrf_token']
    print(id)
    question = Question.query.filter(Question.id == id).first()
    if request.method == "POST":

        print('question',question)
        data = request.get_json()
        print('data',data)
        new_question_text = data.get('question')
        print('question', question)
        question.question = new_question_text
        print('quesion.question', question.question, new_question_text )
        db.session.commit()
        return question.to_dict()


    return "nothing found"

@question_route.route('/delete-question/<int:id>', methods = ["GET", "POST"])
def deleteQuestion(id):

    question = Question.query.filter(Question.id == id).first()
    db.session.delete(question)
    # question.delete()
    db.session.commit()
    return {"message": "Successfully Deleted"}
