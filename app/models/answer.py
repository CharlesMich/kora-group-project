from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    #columns
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    created_at = db.Column(db.Date, default=datetime.date.today, nullable=False)
    updated_at = db.Column(db.Date, default=datetime.date.today, nullable=False)

    #relationships
    answer_user = db.relationship('User', back_populates='user_answer')
    answer_question = db.relationship(
        'Question', back_populates='question_answer')


    def to_dict(self):
            return {
                'id': self.id,
                'body': self.body,
                'user_id': self.user_id,
                'question_id': self.question_id,
                'created_at': self.created_at,
                'updated_at': self.updated_at
            }
