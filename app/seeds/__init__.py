from flask.cli import AppGroup
from .users import seed_users, undo_users
from .questions import seed_questions, undo_questions
from .spaces import seed_spaces, undo_spaces
from .answers import seed_answers, undo_answers
from .follows import seed_followers, undo_followers

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_followers()
        undo_answers()
        undo_spaces()
        undo_questions()
        undo_users()
    seed_users()
    seed_questions()
    seed_spaces()
    seed_answers()
    seed_followers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_followers()
    undo_answers()
    undo_spaces()
    undo_questions()
    undo_users()
    # Add other undo functions here
