from flask import current_app
from flask_login import current_user
import json

from .. import db, login_manager

class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(255), default='Profile')
    email = db.Column(db.String(64))
    password = db.Column(db.String(128))
    remote = db.Column(db.Boolean, default=True)
    # Experience Level  
    experience_level_internship = db.Column(db.Boolean, default=False)
    experience_level_entry = db.Column(db.Boolean, default=False)
    experience_level_associate = db.Column(db.Boolean, default=False)
    experience_level_mid_senior = db.Column(db.Boolean, default=True)
    experience_level_director = db.Column(db.Boolean, default=True)
    experience_level_executive = db.Column(db.Boolean, default=False)
    # Job Types
    job_types_full_time = db.Column(db.Boolean, default=True)
    job_types_contract = db.Column(db.Boolean, default=True)
    job_types_part_time = db.Column(db.Boolean, default=False)
    job_types_temporary = db.Column(db.Boolean, default=True)
    job_types_intership = db.Column(db.Boolean, default=False)
    job_types_other = db.Column(db.Boolean, default=False)
    job_types_volunteer = db.Column(db.Boolean, default=False)
    # date interval
    date = db.Column(db.String(64), default='month')
    #positions
    positions = db.Column(db.String(4096))
    # locations
    locations = db.Column(db.String(4096))
    # distance
    distance = db.Column(db.Integer, default=25)
    # blacklist
    company_blacklist = db.Column(db.String(4096))
    title_blacklist = db.Column(db.String(4096))
    poster_blacklist = db.Column(db.String(4096))
    # uploads
    resume = db.Column(db.String(255))
    cover_letter = db.Column(db.String(255))
    # checkboxes
    checkboxes_driver_licence = db.Column(db.Boolean, default=True)
    checkboxes_require_visa = db.Column(db.Boolean, default=False)
    checkboxes_legally_authorized = db.Column(db.Boolean, default=True)
    checkboxes_urgent_fill = db.Column(db.Boolean, default=False)
    checkboxes_commute = db.Column(db.Boolean, default=True)
    checkboxes_remote = db.Column(db.Boolean, default=True)
    checkboxes_drug_test = db.Column(db.Boolean, default=True)
    checkboxes_assessment = db.Column(db.Boolean, default=True)
    checkboxes_degree_completed = db.Column(db.String(4096))
    checkboxes_background_check = db.Column(db.Boolean, default=True)
    # university gpa
    university_gpa = db.Column(db.Float, default=3.5)
    salary_minimum = db.Column(db.Integer)
    # languages
    language_levels_list = db.Column(db.String(4096))
    language_levels_values = db.Column(db.String(4096))
    # notice period
    notice_period = db.Column(db.Integer())
    experience_years_list = db.Column(db.Text())
    experience_years_values = db.Column(db.Text())
    # personal info
    personal_info_first_name = db.Column(db.String(128))
    personal_info_last_name = db.Column(db.String(128))
    personal_info_phone_country_code = db.Column(db.String(128))
    personal_info_mobile_phone_number = db.Column(db.String(128))
    personal_info_street_address = db.Column(db.String(128))
    personal_info_city = db.Column(db.String(128))
    personal_info_state = db.Column(db.String(128))
    personal_info_zip = db.Column(db.String(128))
    personal_info_linkedin = db.Column(db.String(128))
    personal_info_website = db.Column(db.String(128))
    # eeo
    eeo_gender = db.Column(db.Boolean())#male=True, femail=false
    eeo_race = db.Column(db.Boolean())
    eeo_vetran = db.Column(db.Boolean())
    eeo_disability = db.Column(db.Boolean())
    eeo_citizenship = db.Column(db.Boolean(), default=True)
    eeo_clearance = db.Column(db.Boolean(), default=False)

    def __init__(self, **kwargs):
        super(Profile, self).__init__(**kwargs)
    
    
    def get_languages(self):
        language_list = json.loads(self.language_levels_list)
        language_values = json.loads(self.language_levels_values)
        language_levels = []
        for i  in range(len(language_list)) :
            language_levels.append({
                'key': language_list[i],
                'value': language_values[i]
            })
        return language_levels

    def get_experience(self):
        experience_list = json.loads(self.experience_years_list)
        experience_values = json.loads(self.experience_years_values)
        experience_levels = []
        for i  in range(len(experience_list)) :
            experience_levels.append({
                'key': experience_list[i],
                'value': experience_values[i]
            })
        return experience_levels

    def get_profile_by_id(id):
        profile = Profile.query.filter_by(id = id)
        print(profile)

    def serialize():
        return {
            'data': {
                'id':self.id,
                'user_id': self.user_id,
                'title': self.title,
                'email': self.email,
                'password': self.email,
                'remote': self.password,
                'experienceLevel': {
                    'internship': self.experience_level_internship,
                    'entry': self.experience_level_entry,
                    'associate': self.experience_level_associate,
                    'mid-senior level': self.experience_level_mid_senior,
                    'director': self.experience_level_director,
                    'executive': self.experience_level_executive
                },
                'jobTypes': {
                    'full-time': self.job_types_full_time,
                    'contract': self.job_types_contract,
                    'part-time': self.job_types_part_time,
                    'temporary': self.job_types_temporary,
                    'internship': self.job_types_intership,
                    'other': self.job_types_other,
                    'volunteer': self.job_types_volunteer
                },
                'date': self.date,
                'positions': json.loads(self.positions),
                'locations': json.loads(self.locations),
                'distance': self.distance,
                'companyBlacklist': json.loads(self.company_blacklist),
                'titleBlacklist': json.loads(self.title_blacklist),
                'posterBlacklist': json.loads(self.poster_blacklist),
                'uploads': {
                    'resume': self.resume,
                    'coverLetter': self.cover_letter
                },
                'checkboxes': {
                    'driversLicence': self.checkboxes_driver_licence,
                    'requireVisa': self.checkboxes_require_visa,
                    'legallyAuthorized': self.checkboxes_legally_authorized,
                    'urgentFill': self.checkboxes_urgent_fill,
                    'commute': self.checkboxes_commute,
                    'remote': self.checkboxes_remote,
                    'drugTest': self.checkboxes_drug_test,
                    'assessment': self.checkboxes_assessment,
                    'degreeCompleted': json.loads(self.checkboxes_degree_completed),
                    'backgroundCheck': self.checkboxes_background_check
                },
                'universityGpa': self.university_gpa,
                'salaryMinimum': self.salary_minimum,
                'languages':{
                    'languageList':json.loads(self.language_levels_list),
                    'languageLevels': self.get_languages()
                },
                'noticePeriod': self.email,
                'experience':{
                    'experienceList':[
                        'Accounting/Auditing',
                        'Administrative',
                        'Advertising',
                        'Analyst',
                        'Art/Creative',
                        'Business Development',
                        'Consulting',
                        'Customer Service',
                        'Distribution Design',
                        'Engineering',
                        'Finance',
                        'General Business',
                        'Health Care Provider',
                        'Human Resources',
                        'Information Technology',
                        'Legal',
                        'Management',
                        'Manufacturing',
                        'Marketing',
                        'Public Relations',
                        'Purchasing',
                        'Product Management',
                        'Project Management',
                        'Production',
                        'Quality Assurance',
                        'Research',
                        'Sales',
                        'Science',
                        'Strategy/Planning',
                        'Supply Chain',
                        'Training',
                        'Writing/Editing',
                        'VBA',
                        'PowerBI',
                        'PowerQuery',
                        'Excel',
                        'PowerPoint',
                        'SQL Server',
                        'Communication',
                        'Financial Markets',
                        'Bussiness',
                        'Financial Services',
                        'Team Leadership',
                        'Cash Flow',
                        'Hedging',
                        'Treasury Services',
                        'Microsoft Power BI',
                        'Accounting',
                        'Auditing',
                        'Financial Modeling',
                        'Budgeting & Forecasting',
                        'Fp&a',
                        'PQE',
                        'Training & Development',
                        'default'
                    ],
                    'experienceYears': self.get_experience(),
                },
                'personalInfo': {
                    'First Name': self.personal_info_first_name,
                    'Last Name': self.personal_info_last_name,
                    'Phone Country Code': self.personal_info_phone_country_code,
                    'Mobile Phone Number': self.personal_info_mobile_phone_number,
                    'Street Address': self.personal_info_street_address,
                    'City': self.personal_info_city,
                    'State': self.personal_info_state,
                    'Zip': self.personal_info_zip,
                    'Linkedin': self.personal_info_linkedin,
                    'Website': self.personal_info_website
                },
                'eeo': {
                    'gender': self.eeo_gender,
                    'race': self.eeo_race,
                    'vetran': self.eeo_vetran,
                    'disability': self.eeo_disability,
                    'citizenship': self.eeo_citizenship,
                    'clearance': self.eeo_clearance
                }
            }
        }

        def __repr__(self):
            return f'<Profile {self.personal_info_first_name}, {self.user_id}, {self.title}>'
