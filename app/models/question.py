from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .tag import Tag
import datetime


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(1000), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')))
    created_at = db.Column(
        db.Date, default=datetime.date.today, nullable=False)
    updated_at = db.Column(
        db.Date, default=datetime.date.today, nullable=False)
    question_user = db.relationship('User', back_populates='user_question')
    question_answer = db.relationship(
        'Answer', back_populates='answer_question')
    question_tag = db.relationship('Tag', back_populates='tag_question')

    def to_dict(self):
            return {
                'id': self.id,
                'question': self.question,
                'owner_id': self.owner_id,
                'tag_id': self.tag_id,
                'created_at': self.created_at,
                'updated_at': self.updated_at
            }
