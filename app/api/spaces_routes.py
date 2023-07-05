from flask import Blueprint, request
from app.models import db, Space
from app.forms import SpaceForm
from flask_login import login_required

spaces_route = Blueprint('spaces', __name__)

@spaces_route.route('/', methods = ["GET"])
def spaceIndex():
    spaces = Space.query.all()
    print('spaces', spaces)
    return [space.to_dict() for space in spaces]

@spaces_route.route('/create-space', methods = ["GET", "POST"])
def createSpace():
    form = SpaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        newSpace = Space(
            space_name = data['space_name'],
            description = data['description']
        )

        db.session.add(newSpace)
        db.session.commit()
        return newSpace.to_dict()
    else:
        return form.errors
