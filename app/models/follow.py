from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    following_user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), primary_key=True)
    followed_user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), primary_key=True)
    follow_user = db.relationship('User', back_populates='user_follow', foreign_keys=[following_user_id])

    def to_dict(self):
        return {
            'following_user_id': self.following_user_id,
            'followed_user_id': self.followed_user_id
        }

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(50), unique=True, nullable=False)
#     followers = db.relationship('User', secondary='followers',
#                                 primaryjoin=(id == db.ForeignKey('followers.c.followed_id')),
#                                 secondaryjoin=(id == db.ForeignKey('followers.c.follower_id')),
#                                 backref=db.backref('followed', lazy='dynamic'), lazy='dynamic')


# followers = db.Table('followers',
#                      db.Column('follower_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
#                      db.Column('followed_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
#                      )


# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
