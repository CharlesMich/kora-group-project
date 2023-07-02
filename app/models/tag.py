from sqlalchemy.schema import Column, ForeignKey, Table
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

tags_questions = db.Table(
    "tags_questions",
    db.metadata,
    db.Column("tag_id", ForeignKey(add_prefix_for_prod("tags.id")), primary_key=True),
    db.Column("questions_id", ForeignKey(add_prefix_for_prod("questions.id")), primary_key=True))

if environment == "production":
    tags_questions.schema = SCHEMA


class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    #columns
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(100))

    #relationships
    tag_question = db.relationship('Question', secondary=tags_questions, back_populates='question_tag', primaryjoin='Tag.id == Question.tag_id')


    def to_dict(self):
            return {
                'id': self.id,
                'tag_name': self.tag_name,
            }
