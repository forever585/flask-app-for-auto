
// language level array init when new language added
function initLanguageLevels(element=undefined, index){
    let value = element.value;
    let key = data.languages.languageList[index];
    let newItem = {
            key: key,
            value: languageLevelChoice[value]
        }
    let dupIndex = data.languages.languageLevels.findIndex((item) => { return item.key === key })
    if (dupIndex === -1)
        data.languages.languageLevels.push(newItem)
    else data.languages.languageLevels[dupIndex] =  newItem
    
}
// experience years array init when new experience added
function initExperienceYears(){
    data.experience.map(item => {
        data.experienceYears.push({
            key: item,
            value: 0
        })
    })
}

function initChildArray(parentKey, childKey, value){
    data[parentKey].map(item => {
        data[childKey].push({
            key: item,
            value: value
        })
    })
}
// Add new tag button listner
function onAddButtonClick(e) {
    let key = e.target.attributes.key.nodeValue;
    let parent
    try{
        parent = e.target.attributes.parent.nodeValue;
    }
    catch(e){
        parent = undefined;
    }

    let tag = $(`#${key}_tag_input`).val();
    if(tag === '') {
        toastr.warning('Please fill input field and add tag!')
        return
    }
    parent === undefined ? data[key].push(tag) : data[parent][key].push(tag);
    showTagOnContainer(key, parent);
    $(`#${key}_tag_input`).val('');
}
// display tags html on browser
function showTagOnContainer(key, parent=undefined){
    $(`#${key}_tag_container`).html(returnTagHtml(key, parent));
}
// init tags with tag data array
function returnTagHtml(key, parent=undefined){
    let html = '';
    let array = parent === undefined ? data[key] : data[parent][key]
    array.map((item, index) => {
        html += parent === undefined ?`<span class="tag">${item}<i class="fa fa-close tag-remove" key="${key}" idx=${index} onclick="removeTag(this)"></i></span>` :
        `<span class="tag">${item}<i class="fa fa-close tag-remove" parent="${parent}" key="${key}" idx=${index} onclick="removeTag(this)"></i></span>`;
    })
    return html;
}
//delete tag when user click remove icon
function removeTag(element) {
    let idx = parseInt(element.attributes.idx.nodeValue) ;
    let key = element.attributes.key.nodeValue;
    let newArray = [];
    let parent
    try{
        parent = element.attributes.parent.nodeValue;
    }
    catch(e){
        parent = undefined;
    }
    let array = parent === undefined ? data[key] : data[parent][key];
    array.map((item, index) => {
        if(index !== idx) newArray.push(item)
    });
    parent === undefined ? data[key] = newArray : data[parent][key] = newArray;
    showTagOnContainer(key, parent);
}
//on Select add button clicked
function onSelectAddButtonClicked(element){
    let key = element.attributes.key.nodeValue;
    let parent
    try{
        parent = element.attributes.parent.nodeValue;
    }
    catch(e){
        parent = undefined;
    }

    let select = $(`#${key}_input`).val();
    if(select === '') {
        toastr.warning('Please fill input field and click button!')
        return
    }
    let array = parent === undefined ? data[key] : data[parent][key];
    if (array.find((item) => {return select === item}) === undefined)
                array.push(select);
        else {
            toastr.warning('You already input this one')
            return
    }
    parent === undefined ? data[key] = array : data[parent][key] = array;
    showSelectOnContainer(key, parent);
    $(`#${key}_input`).val('');
}

function addExperience(element){
    data[expe]
}

function showSelectOnContainer(key, parent=undefined){
    $(`#${key}_select_container`).html(returnSelectHtml(key, parent));
}

function returnSelectHtml(key, parent=undefined){
    let html = '';
    let array = parent === undefined ? data[key] : data[parent][key]
    array.map((item, index) => {
        html += `<div class="w-50 mb-4 mx-0" title="">
                    <label class="form-label">${item}</label>
                    <div class="form--select">
                        <select parent="english_level" key="english_level" class="form-select" parent="languages" key="langu" onchange="initLanguageLevels(this, ${index})">
                            <option ${data.languages.languageLevels[item] === languageLevelChoice[0] ? 'selected' : ''} value="0">None</option>
                            <option ${data.languages.languageLevels[item] === languageLevelChoice[1] ? 'selected' : ''} value="1">Conversational</option>
                            <option ${data.languages.languageLevels[item] === languageLevelChoice[2] ? 'selected' : ''} value="2">Professional</option>
                            <option ${data.languages.languageLevels[item] === languageLevelChoice[3] ? 'selected' : ''} value="3">Native or bilingual</option>
                        </select>
                    </div>
                </div>`
    })
    return html;
}

function addExperienceClick(element, type){
    if(type === 'custom'){
        let customExperience = $('#custom_experience_input').val()
        if($('#custom_experience_input').val() === ''){
            toastr.warning('Please fill this field')
            return
        }
        if (data.experience.experienceList.find((item) => {customExperience === item}) === undefined)
                data.experience.experienceList.push();
        else {
            toastr.warning('You already input this one')
            return
        }
    }
    let experience = type === 'normal' ?
        data.experience.experienceList[element.value] : 
        $('#custom_experience_input').val();
    let newExperienceList = []
    data.experience.experienceList.map((item, index) =>{
        if (item !== experience) newExperienceList.push(item)
    })
    data.experience.experienceList = newExperienceList;
    data.experience.experienceYears.push({
        key: experience,
        value: 0
    });
    html = returnExperienceYearInputHtml();
    $('#experienceList_container').html(html);
    updateNormalExperienceList()
}

function returnExperienceYearInputHtml(){
    let html = '';
    data.experience.experienceYears.map((item, index) => {
        html += `<div class="col-md-4 mb-3">
                    <label class="form-label" id="">${item.key}</label>
                    <input 
                        type="number" 
                        class="form-control form--control experience-input" 
                        key="${item.key}" 
                        value_type="int" 
                        index="${index}"
                        placeholder="${item.key}"
                        value_type="int"
                        onblur="updateExperience(this)"/>
                </div>`
        
    })
    return html;
}

function updateNormalExperienceList(){
    let html = '';
    data.experience.experienceList.map((item, key) => {
        html += `<option value="${key}">${item}</option>`
    })
    $('#experience_normal_list').html(html)
}

function updateExperience(element){
    if(parseValue(element)) return;
    data.experience.experienceYears[element.attributes.index.nodeValue] = {
        key: element.attributes.key.nodeValue,
        value: element.value
    }
}

// on file load listener
function onFileLoad(element){
    let key = element.attributes.key.nodeValue;
    let parent;
    try{
        parent = element.attributes.parent.nodeValue;
    }
    catch(e){
        parent = undefined;
    }
    parent === undefined ? data[key] = element.files : data[parent][key] = element.files;
    console.log(data)
}
//select change listener
function onSelectChange(element){
    let key = element.attributes.key.nodeValue;
    data[key] = element.selectedOptions[0].value
}

// Parse Inputed Value is Valid Type
function parseValue(element){
    let valueType
    try{
        valueType = element.attributes.value_type.nodeValue;
    }
    catch(e){
        return true
    }
    let parseResult;
    switch(valueType){
        case 'int':
            parseResult = parseInt(element.value)
            break;
        case 'float':
            parseResult = parseFloat(element.value)
            break;
        default :
            parseResult = True;
            break
    }
    if(isNaN(parseResult)) {
        toastr.warning(`Please input valid value for <b style="color:black;">${element.placeholder}</b> Field !`);
        element.value = ""
        return false
    }
}

//input change listener
function onInputChange(element){
    if (!parseValue(element)) return;
    let key = element.attributes.key.nodeValue;
    let parent;
    try{
        parent = element.attributes.parent.nodeValue;
    }
    catch(e){
        parent = undefined;
    }
    parent === undefined ? data[key] = element.value : data[parent][key] = element.value;
}
//checkbox change listener
function onToggle(element){
    let key = element.attributes.key.nodeValue;
    let parent;
    try{
        parent = element.attributes.parent.nodeValue;
    }
    catch(e){
        parent = undefined;
    }
    let status = element.checked ? 1 : 0;
    parent === undefined ? data[key] = status : data[parent][key] = status;
}

function onSubmit(){
    // data['csrf_token'] = $('#csrf_token').val();
    // console.log(data)
    uploadResume()
}

function uploadResume(){
    let formData = new FormData();
    console.log($('#resume_file_input'))
    let resume = $('#resume_file_input')[0].files[0] /* === null ? {} : data['uploads']['resume'][0] */
    let coverLetter = $('#cover_letter_file_input')[0].files[0] /* === null ? {} : data['uploads']['coverLetter'][0] */

    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    $.ajax({
        url: $('#upload_url').val(),
        method: 'post',
        data: formData,
        contentType : false,
        processData : false,
        headers: {
            "X-CSRFToken": $('#csrf_token').val(),
        },
        success: function(res, textStatus, xhr) {
            console.log(res)
            let resumeFilename = res.resume;
            let coverLetterFileName = res.coverLetter;
            data['uploads']['resume'] = resumeFilename;
            data['uploads']['coverLetter'] = coverLetterFileName;
            postProfile();
        },
        complete: function(xhr, textStatus) {
            switch(xhr.status){
                case 400:
                    toastr.error(xhr.responseJSON.message)
            }
        } 
    });
}

function postProfile(){
    if(data['uploads']['resume'] === '') toastr.warning('Please select your resume file!')
    sendData = JSON.stringify(data)
    $.ajaxSetup({
        contentType: "application/json; charset=utf-8"
      });
      
    $.ajax({
        type: 'POST',
        url: $('#form_submit_url').val(),
        headers: {
            "X-CSRFToken": $('#csrf_token').val(),
        },
        data: sendData, 
        success: function(res, textStatus, xhr) {
            toastr.success(res.message)
        },
        complete: function(xhr, textStatus) {
            switch(xhr.status){
                case 400:
                    toastr.error(xhr.responseJSON.message)
            }
        } 
    })
}