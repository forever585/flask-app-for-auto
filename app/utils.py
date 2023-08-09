from flask import url_for
from wtforms.fields import Field
from wtforms.widgets import HiddenInput
from wtforms.compat import text_type
import random, string, os
from flask_login import current_user
from flask import make_response, jsonify

import app
from config import Config

def register_template_utils(app):
    """Register Jinja 2 helpers (called from __init__.py)."""

    @app.template_test()
    def equalto(value, other):
        return value == other

    @app.template_global()
    def is_hidden_field(field):
        from wtforms.fields import HiddenField
        return isinstance(field, HiddenField)

    app.add_template_global(index_for_role)


def index_for_role(role):
    return url_for(role.index)


class CustomSelectField(Field):
    widget = HiddenInput()

    def __init__(self, label='', validators=None, multiple=False,
                 choices=[], allow_custom=True, **kwargs):
        super(CustomSelectField, self).__init__(label, validators, **kwargs)
        self.multiple = multiple
        self.choices = choices
        self.allow_custom = allow_custom

    def _value(self):
        return text_type(self.data) if self.data is not None else ''

    def process_formdata(self, valuelist):
        if valuelist:
            self.data = valuelist[1]
            self.raw_data = [valuelist[1]]
        else:
            self.data = ''

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def file_upload(file):
    print(file)
    if file and allowed_file(file.filename):
        filename = file.filename
        path = Config.UPLOAD_FOLDER + f'{current_user.id}'
        if not os.path.exists(path):
            os.makedirs(path)
        file.save(os.path.join(path + '/', filename))
        return filename

def change_to_boolean(value):
    if value == 1:
        return True
    else:
        return False

def random_string(length):
   letters = string.ascii_lowercase
   return ''.join(random.choice(letters) for i in range(length))