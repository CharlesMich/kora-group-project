from flask import Blueprint, request
from app.models import db, Follow
from app.forms import FollowForm
from flask_login import login_required, current_user

follow_route = Blueprint('follows', __name__)


# Get count of the followers of the user
@follow_route.route('/<int:id>', methods = ["GET"])
def get_FollowCount(id):
    follows = Follow.query.filter(Follow.following_user_id == id).count()
    print('follows count', follows)
    return {"follows":follows, "id":id, }


# Get all the followers of the user
@follow_route.route('/followers/<int:id>', methods = ["GET"])
def get_AllFollowers(id):
    followers = Follow.query.filter(Follow.following_user_id == id).all()
    return [follower.to_dict() for follower in followers]




@follow_route.route('/add-follows/<int:id>', methods = ["POST"])
def add_Follow(id):
    follows = Follow.query.filter(Follow.following_user_id == current_user.id).first()
    if follows:
        pass
    add_follow = Follow(following_user_id = current_user.id, followed_user_id = id)
    db.session.add(add_follow)
    db.session.commit()
    return add_follow.to_dict()


@follow_route.route('/delete-follows/<int:id>', methods = ["POST"])
def remove_follow(id):
    follows = Follow.query.filter(Follow.following_user_id == current_user.id).first()
    if not follows:
        pass
    db.session.delete(follows)
    db.session.commit()
    return {"message": "Successfully Deleted"}
