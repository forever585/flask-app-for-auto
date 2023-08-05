$(document).ready(function(){
    showTagOnContainer('additional_degree');
});

let gTagData = {
    'positions': [],
    'location': [],
    'company_blacklist': [],
    'title_blacklist': [],
    'additional_degree': ['High School Diploma', 'Bachelor\'s Degree']
}

function setTags(id, array){
    let html = ''
    array.map((item) => {
    });
    $('#' + id).html(html)
}

$('#submit-button').on('click', (e) => {
    e.preventDefault();
    let formData = [];
    // Collect information from Form
    formData['linkedin_email'] = $('#linkedin_email').val();
    formData['linkedin_password'] = $('#linkedin_password').val();
    formData['only_remote'] = $('#only_remote').checked;
    formData['job_level_internship'] = $('#job_level_internship')[0].checked;
    formData['job_level__ntry'] = $('#job_level_entry')[0].checked;
    formData['job_level_associate'] = $('#job_level_associate')[0].checked;
    formData['job_level_mid_senior'] = $('#job_level_mid_senior')[0].checked;
    formData['job_level_executive'] = $('#job_level_executive')[0].checked;
    formData['job_type_full_time'] = $('#job_type_full_time')[0].checked;
    formData['job_type_contract'] = $('#job_type_contract')[0].checked;
    formData['job_type_part_time'] = $('#job_type_part_time')[0].checked;
    formData['job_type_temporary'] = $('#job_type_temporary')[0].checked;
    formData['job_type_other'] = $('#job_type_other')[0].checked;
    formData['job_type_volunteer'] = $('#job_type_volunteer')[0].checked;
    formData['time_range_all_time'] = $('#time_range_all_time')[0].checked;
    formData['time_range_month'] = $('#time_range_month')[0].checked;
    formData['time_range_week'] = $('#time_range_week')[0].checked;
    formData['time_range_day'] = $('#time_range_day')[0].checked;
    formData['distance']  = $('#distance').val();
    formData['resume_file'] = $('#resume_file')[0].files;
    formData['cover_letter'] = $('#cover_letter').val();
    formData['additional_driver_license'] = $('#additional_driver_license')[0].checked;
    formData['additional_require_sponsorship'] = $('#additional_require_sponsorship')[0].checked;
    formData['additional_require_visa'] = $('#additional_require_visa')[0].checked;
    formData['additional_legally_authorized'] = $('#additional_legally_authorized')[0].checked;
    formData['additional_urgent_fill'] = $('#additional_urgent_fill')[0].checked;
    formData['additional_commute_comfortable'] = $('#additional_commute_comfortable')[0].checked;
    formData['additional_remote_comfortabl'] = $('#additional_remote_comfortable')[0].checked;
    formData['additional_drug_test'] = $('#additional_drug_test')[0].checked;
    formData['additional_assessment'] = $('#additional_assessment')[0].checked;
    formData['additional_background_check'] = $('#additional_background_check')[0].checked;
    formData['positions'] = gTagData['positions']
    formData['location'] = gTagData['location']
    formData['company_blacklist'] = gTagData['company_blacklist']
    formData['title_blacklist'] = gTagData['title_blacklist']
    formData['additional_degree'] = gTagData['additional_degree']
    
    if ( formData['resume_file'].length == 0 ) {
        toastr.error('You have to select <b>Resume</b>!')
        return
    }
    console.log(formData)
});

function addTagToArray(id) {
    let tag = $(`#${id}_tag_input`).val();
    if(tag == '') {
        toastr.warning('Please fill input field and add tag!')
        return
    }
    gTagData[id].push(tag);
    showTagOnContainer(id);
    $(`#${id}_tag_input`).val('');
}

function showTagOnContainer(id){
    let html = '';
    gTagData[id].map((item, key) => {
        html += `<span class="tag">${item}<i class="fa fa-close tag-remove" onclick="removeTag(${key}, '${id}')"></i></span>`
    });
    $(`#${id}_tag_container`).html(html);
}

function removeTag(idx, id){
    let newArray = [];
    gTagData[id].map((item, key) => {
        if(key !== idx) newArray.push(item)
    });
    gTagData[id] = newArray;
    showTagOnContainer(id);
}

$('button').on('click', (e) => {
    e.preventDefault()
})