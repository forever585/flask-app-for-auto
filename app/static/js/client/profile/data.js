let data = {
    title:'',
    email: '',
    password: '',
    remote: 1,
    experienceLevel: {
        'internship': 0,
        'entry': 0,
        'associate': 0,
        'mid-senior level': 1,
        'director': 1,
        'executive': 0
    },
    jobTypes: {
        'full-time': 1,
        'contract': 1,
        'part-time': 0,
        'temporary': 1,
        'internship': 0,
        'other': 0,
        'volunteer': 0
    },
    date: 'month',
    positions: [
        'Project Manager',
        'Scrum Master'
    ],
    locations: [
        'United States'
    ],
    distance: 25,
    companyBlacklist: [
        'Fidelity',
        'TD',
        'RBC',
        'Fidelity Investments',
        'Confidential',
        'Royal Bank of Canada'
    ],
    titleBlacklist: [
        ''
    ],
    posterBlacklist: [''],
    uploads: {
        resume: '',
        coverLetter: ''
    },
    checkboxes: {
        driversLicence: 1,
        requireVisa: 0,
        legallyAuthorized: 1,
        urgentFill: 1,
        commute: 0,
        remote: 1,
        drugTest: 1,
        assessment: 1,
        degreeCompleted: [
            `Bachelor's Degree`
        ],
        backgroundCheck: 1
    },
    universityGpa: 3.5,
    salaryMinimum: 180000,
    languages:{
        languageList:[],
        languageLevels: []
    },
    
    noticePeriod: 2,
    experience:{
        experienceList:[
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
        experienceYears: [],
    },
    personalInfo: {
        'First Name': '',
        'Last Name': '',
        'Phone Country Code': '',
        'Mobile Phone Number': '',
        'Street Address': '',
        'City': '',
        'State': '',
        'Zip': '',
        'Linkedin': '',
        'Website': ''
    },
    eeo: {
        gender: 'None',
        race: 'None',
        vetran: 'None',
        disability: 'None',
        citizenship: 'yes',
        clearance: 'no'
    }
}

let languageLevelChoice = [
    'None',
    'Conversational',
    'Professional',
    'Native or bilingual'
]

// var ddddd = $('#form_data').data()
// console.log(ddddd)