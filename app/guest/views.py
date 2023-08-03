from flask import Blueprint, render_template

from app.models import EditableHTML

guest = Blueprint('guest', __name__)


@guest.route('/')
def index():
    data = {'active': 'home'}
    return render_template('guest/home.html', data=data)


@guest.route('/help')
def about():
    data = {'active': 'help'}
    return render_template('guest/help.html', data=data)
