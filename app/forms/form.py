from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class QuestionForm(FlaskForm):
    question = StringField('Question', validators=[DataRequired()])
    owner_id = IntegerField('OwnerId', validators=[DataRequired()])
    tag_id = IntegerField('tagId', validators=[DataRequired()])
    submit = SubmitField('Post Question')

class AnswerForm(FlaskForm):
    body = StringField('Answer', validators=[DataRequired()])
    user_id = IntegerField('userId', validators=[DataRequired()])
    question_id = IntegerField('QuestionId', validators=[DataRequired()])

class FollowForm(FlaskForm):
    following_userId = IntegerField('followUser')
    followed_userId = IntegerField('followedUser')

class TagForm(FlaskForm):
    tag_name = StringField('tagName')   
    
