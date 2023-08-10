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

from ..models import Profile
from ..utils import file_upload, change_to_boolean
from .. import db

client = Blueprint('client', __name__)

@client.route('/', methods=['GET'])
@login_required
def index():
    data = {'title': 'Dashboard', 'active': 'dashboard', 'user': current_user}
    return render_template('client/dashboard.html', data=data)

@client.route('/profile/upload', methods=['POST'])
@login_required
def upload_resume():
    data = request.files
    resume_file = get_file_from_formdata(data, 'resume')
    cover_letter_file = get_file_from_formdata(data, 'coverLetter')

    if resume_file == None:
        return make_response({'message': 'Please upload your resume file'}, 400)
    else:
        resume_filename = file_upload(resume_file)

    if cover_letter_file == None:
        cover_letter_filename = ''
    else:
        cover_letter_filename = file_upload(cover_letter_file)
    return make_response({
        'resume': resume_filename,
        'coverLetter': cover_letter_filename
    }, 200)

@client.route('/profile', methods=['GET'])
@login_required
def profile():
    profile_list = Profile.query.filter_by(user_id = current_user.id).all()
    print(profile_list)
    data = {
            'title': 'Profile',
            'active': 'profile',
            'user': current_user,
            'url': url_for('client.profile'),
            'form_data':Profile}
    return render_template('client/profile/list.html', data=data)

@client.route('/profile/add', methods=['GET', 'POST'])
@login_required
def profile_add():
    if request.method == 'GET':
        data = {
            'title': 'Profile',
            'active': 'profile',
            'type': 'add',
            'user': current_user,
            'url': url_for('client.profile') + '/add',
            'upload':url_for('client.profile') + '/upload',
            'form_data':Profile}
        return render_template('client/profile/detail.html', data=data)
    elif request.method == 'POST':
        if save_profile(request.get_json(force=True)) == True:
            return make_response(jsonify({'message': 'Your Profile Successfully Uploaded!'}), 200)

@client.route('/profile/edit/<id>', methods=['GET', 'POST'])
@login_required
def profile_edit(id):
    if request.method == 'GET':
        profile = Profile.get_profile_by_id(id)
        data = {
            'title': 'Profile',
            'active': 'profile',
            'user': current_user,
            'url': url_for('client.profile'),
            'form_data':Profile}
        return render_template('client/profile/detail.html', data=data)
    elif request.method == 'POST':
        #print(json.load(request.form['data']))
        save_profile(request.get_json(force=True))
        return make_response(jsonify('ddd'), 200)

@client.route('/profile/delete/<id>', methods=['GET', 'POST'])
@login_required
def profile_delete(id):
    pass
    # return make_response(jsonify('ddd'), 200)

def get_file_from_formdata(data, key):
    try:
        return data[key]
    except:
        return None

def parse_list(data):
    key_list = []
    value_list = []
    for item in data:
        key_list.append(item['key'])
        value_list.append(item['value'])
    return key_list, value_list

def save_profile(data):
    try:
        language_levels_list, language_levels_values = parse_list(data['languages']['languageLevels'])
        experience_years_list, experience_years_values = parse_list(data['experience']['experienceYears'])
        profile = Profile(
            user_id = current_user.id,
            title = data['title'],
            email = data['email'],
            password = data['password'],
            remote = change_to_boolean(data['remote']),
            experience_level_internship = change_to_boolean(data["experienceLevel"]['internship']),
            experience_level_entry = change_to_boolean(data['experienceLevel']['entry']),
            experience_level_associate = change_to_boolean(data['experienceLevel']['associate']),
            experience_level_mid_senior = change_to_boolean(data['experienceLevel']['mid-senior level']),
            experience_level_director = change_to_boolean(data['experienceLevel']['director']),
            experience_level_executive = change_to_boolean(data['experienceLevel']['executive']),
            job_types_full_time = change_to_boolean(data['jobTypes']['full-time']),
            job_types_contract = change_to_boolean(data['jobTypes']['contract']),
            job_types_part_time = change_to_boolean(data['jobTypes']['part-time']),
            job_types_temporary = change_to_boolean(data['jobTypes']['temporary']),
            job_types_intership = change_to_boolean(data['jobTypes']['internship']),
            job_types_other = change_to_boolean(data['jobTypes']['other']),
            job_types_volunteer = change_to_boolean(data['jobTypes']['volunteer']),
            date = data['date'],
            positions = json.dumps(data['positions']),
            locations = json.dumps(data['locations']),
            distance = json.dumps(data['distance']),
            company_blacklist = json.dumps(data['companyBlacklist']),
            title_blacklist = json.dumps(data['titleBlacklist']),
            poster_blacklist = json.dumps(data['posterBlacklist']),
            resume = data['uploads']['resume'],
            cover_letter = data['uploads']['coverLetter'],
            checkboxes_driver_licence = change_to_boolean(data['checkboxes']['driversLicence']),
            checkboxes_require_visa = change_to_boolean(data['checkboxes']['requireVisa']),
            checkboxes_legally_authorized = change_to_boolean(data['checkboxes']['legallyAuthorized']),
            checkboxes_urgent_fill = change_to_boolean(data['checkboxes']['urgentFill']),
            checkboxes_commute = change_to_boolean(data['checkboxes']['commute']),
            checkboxes_remote = change_to_boolean(data['checkboxes']['remote']),
            checkboxes_drug_test = change_to_boolean(data['checkboxes']['drugTest']),
            checkboxes_assessment = change_to_boolean(data['checkboxes']['assessment']),
            checkboxes_degree_completed = json.dumps(data['checkboxes']['degreeCompleted']),
            checkboxes_background_check = change_to_boolean(data['checkboxes']['backgroundCheck']),
            university_gpa = data['universityGpa'],
            salary_minimum = data['salaryMinimum'],
            language_levels_list = json.dumps(language_levels_list),
            language_levels_values = json.dumps(language_levels_values),
            notice_period = data['noticePeriod'],
            experience_years_list = json.dumps(experience_years_list),
            experience_years_values = json.dumps(experience_years_values),
            personal_info_first_name = data['personalInfo']['First Name'],
            personal_info_last_name = data['personalInfo']['Last Name'],
            personal_info_phone_country_code = data['personalInfo']['Phone Country Code'],
            personal_info_mobile_phone_number = data['personalInfo']['Mobile Phone Number'],
            personal_info_street_address = data['personalInfo']['Street Address'],
            personal_info_city = data['personalInfo']['City'],
            personal_info_state = data['personalInfo']['State'],
            personal_info_zip = data['personalInfo']['Zip'],
            personal_info_linkedin = data['personalInfo']['Linkedin'],
            personal_info_website = data['personalInfo']['Website'],
            eeo_gender = change_to_boolean(data['eeo']['gender']),
            eeo_race = change_to_boolean(data['eeo']['race']),
            eeo_vetran = change_to_boolean(data['eeo']['vetran']),
            eeo_disability = change_to_boolean(data['eeo']['disability']),
            eeo_citizenship = change_to_boolean(data['eeo']['citizenship']),
            eeo_clearance = change_to_boolean(data['eeo']['clearance'])
        )
        db.session.add(profile)
        db.session.commit()
        return True
    except:
        return False