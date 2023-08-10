from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    request,
    url_for,
    make_response,
    jsonify
)

from flask_login import (
    login_required,
    current_user
)

import json

# from ...models import Profile
# from ...utils import file_upload, change_to_boolean
from ... import db

membership = Blueprint('membership', __name__)

@membership.route('/', methods=['GET'])
@login_required
def index():
    data = {'title': 'Membership', 'active': 'membership', 'user': current_user}
    return render_template('client/membership/list.html', data=data)
