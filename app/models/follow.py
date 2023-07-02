from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    following_user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    followed_user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    follow_user = db.relationship('User', back_populates='user_follow', foreign_keys=[following_user_id])

    def to_dict(self):
        return {
            'following_user_id': self.following_user_id,
            'followed_user_id': self.followed_user_id
        }
