from sqlalchemy.schema import Column, ForeignKey, Table
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

spaces_questions = db.Table(
    "spaces_questions",
    db.metadata,
    db.Column("space_id", db.Integer, ForeignKey(add_prefix_for_prod("spaces.id")), primary_key=True),
    db.Column("questions_id", db.Integer, ForeignKey(add_prefix_for_prod("questions.id")), primary_key=True))

if environment == "production":
    spaces_questions.schema = SCHEMA


class Space(db.Model):
    __tablename__ = 'spaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    #columns
    id = db.Column(db.Integer, primary_key=True)
    space_name = db.Column(db.String(100))
    description = db.Column(db.String(1000))

    #relationships
    space_question = db.relationship('Question', secondary=spaces_questions, back_populates='question_space', primaryjoin='Space.id == Question.space_id')


    def to_dict(self):
            return {
                'id': self.id,
                'space_name': self.space_name,
                'description': self.description
            }
