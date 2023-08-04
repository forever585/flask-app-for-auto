from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)

from flask_login import login_required

client = Blueprint('client', __name__)

@client.route('/', methods=['GET'])
@login_required
def index():
    data = {'title': 'Dashboard', 'active': 'dashboard'}
    return render_template('client/dashboard.html', data=data)

@client.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    data = {'title': 'Profile', 'active': 'profile'}
    return render_template('client/profile.html', data=data)