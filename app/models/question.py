from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .space import Space, spaces_questions
import datetime


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    #columns
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(1000), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spaces.id')))
    created_at = db.Column(db.Date, default=datetime.date.today, nullable=False)
    updated_at = db.Column(db.Date, default=datetime.date.today, nullable=False)

    #relationships
    question_user = db.relationship('User', back_populates='user_question')
    question_answer = db.relationship('Answer', back_populates='answer_question')
    question_space = db.relationship('Space', secondary=spaces_questions, backref='questions')


    def to_dict(self):
            return {
                'id': self.id,
                'question': self.question,
                'owner_id': self.owner_id,
                'space_id': self.space_id,
                'created_at': self.created_at,
                'updated_at': self.updated_at,
                "User_firstName": self.question_user.first_name,
                'User_lastName': self.question_user.last_name
            }
