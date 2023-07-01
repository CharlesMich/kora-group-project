from flask import Blueprint, request
from app.models import db, Tag
from app.forms import TagForm
from flask_login import login_required

tag_route = Blueprint('tag', __name__)

@tag_route.route('/', methods = ["GET"])
def tagIndex():
    tags = Tag.query.all()
    print('tags', tags)
    return [tag.to_dict() for tag in tags]

@tag_route.route('/create-tag', methods = ["GET", "POST"])
def createTag():
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        newTag = Tag(
            tag_name = data['tag_name'],
        )

        db.session.add(newTag)
        db.session.commit()
        return newTag.to_dict()
    else:
        return form.errors

