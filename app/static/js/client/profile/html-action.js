

function initHtml(){
    let profileHtml = `
    <!-- Email Password -->
    <div class="col-md-5 mb-4">
        <label class="form-label">LinkedIn Email *</label>
        <input type="email" class="form-control form--control" key="email" placeholder="Email" value="${data.email}" onblur="onInputChange(this)" required/>
    </div>

    <div class="col-md-5 mb-4">
        <label class="form-label">LinkdedIn Password *</label>
        <input type="text" class="form-control form--control" key="password" placeholder="Password" value="${data.password}"  onblur="onInputChange(this)"required/>
    </div>
    <!-- Remote -->
    <div class="col-md-2 mb-4 flex-end">  
        <div class="form-check form--check" title="Please check this if you want only apply for remote jobs!">
            <input class="form-check-input custom--check" type="checkbox" key="remote" name="remote" ${data.remote === 1 ? 'checked': ''} onchange="onToggle(this)"/>
            <label class="form-check-label form-label" for="remote">Remote</label>
        </div>
    </div>
    
    <!-- Positions -->
    <div class="col-md-12 mb-4">
        <div class="checkbox-container" title="Select level(s) of jobs you wish to apply.">
            <span class="checkbox-container-label">Experience Level *</span>
            <div class="row mx-0 my-3 px-2">
                <div class="col-md-3 p-0 flex-end">  
                    <div class="form-check form--check" title="">
                        <input class="form-check-input custom--check" type="checkbox" id="job_level_internship" name="job_level_internship" parent="experienceLevel" key="internship" ${data.experienceLevel['internship'] === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_level_internship">Internship</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_level_entry" name="job_level_entry" parent="experienceLevel" key="entry" ${data.experienceLevel['entry'] === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_level_entry">Entry</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_level_associate" name="job_level_associate" parent="experienceLevel" key="associate" ${data.experienceLevel['associate'] === 1 ? 'checked': ''} onchange="onToggle(this)" />
                        <label class="form-check-label form-label m-0" for="job_level_associate">Associate</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_level_mid_senior" name="job_level_mid_senior" parent="experienceLevel" key="mid-senior level" ${data.experienceLevel['mid-senior level'] === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_level_mid_senior">Mid-Senior</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_level_mid_senior" name="job_level_mid_senior" parent="experienceLevel" key="director" ${data.experienceLevel['director'] === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_level_mid_senior">Director</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_level_executive" name="job_level_executive" parent="experienceLevel" key="executive" ${data.experienceLevel['executive'] === 1 ? 'checked': ''}  onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_level_executive">Executive</label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Job Types -->
    <div class="col-md-12 mb-3">
        <div class="checkbox-container" title="Select the types of jobs you wish to apply.">
            <span class="checkbox-container-label">Job Types *</span>
            <div class="row mx-0 my-3 px-2">
                <div class="col-md-3 p-0 flex-end">  
                    <div class="form-check form--check" title="">
                        <input class="form-check-input custom--check" type="checkbox" id="job_type_full_time" name="job_type_full_time" parent="jobTypes"  key="full-time" ${data.jobTypes['full-time'] === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_type_full_time">Full Time</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_type_contract" name="job_type_contract" parent="jobTypes"  key="contract" ${data.jobTypes['contract'] === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_type_contract">Contract</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_type_part_time" name="job_type_part_time" parent="jobTypes"  key="part-time" ${data.jobTypes['part-time'] === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_type_part_time">Part Time</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_type_temporary" name="job_type_temporary" parent="jobTypes"  key="temporary" ${data.jobTypes['temporary'] === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_type_temporary">Temporary</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="job_type_other" name="job_type_internship" parent="jobTypes"  key="internship" ${data.jobTypes['internship'] === 1 ? 'checked': ''}  onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_type_other">Internship</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="" name="" parent="jobTypes"  key="other" ${data.jobTypes['other'] === 1 ? 'checked': ''}  onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="">Other</label>
                    </div>
                </div>

                <div class="col-md-3 p-0 flex-end" title="">  
                    <div class="form-check form--check">
                        <input class="form-check-input custom--check" type="checkbox" id="" name="" parent="jobTypes"  key="volunteer" ${data.jobTypes['volunteer'] === 1 ? 'checked': ''}  onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="job_type_volunteer">Volunteer</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Time Range -->
    <div class="col-md-12 mb-4" title="Select date to decide the time range when the job was posted.">
        <label class="form-label">Date</label>
        <div class="form--select">
            <select id="" name=""  key="date" class="form-select" onchange="onSelectChange(this)">
                <option ${data.date === 'all time' ? 'selected' : '' } value="all time">All Time</option>
                <option ${data.date === 'month' ? 'selected' : '' } value="month">Month </option>
                <option ${data.date === 'week' ? 'selected' : '' } value="week">Week </option>
                <option ${data.date === '24 hours' ? 'selected' : '' } value="24 hours">24 Hours</option>
            </select>
        </div>
    </div>

    <!-- Positions -->
    <div class="col-md-12 mb-3">
        <div class="checkbox-container" title="Add positions to search the job titles you are interested to apply for.">
            <span class="checkbox-container-label">Positions</span>
            <div id="positions_tag_container" class="tag-container mx-0 my-3 px-2">
                ${ returnTagHtml('positions')}
            </div>
            <div class="mx-0 my-3 px-2 add-container">
                <input id="positions_tag_input" type="text" class="form-control form--control" placeholder="Please input one position and click button"/>
                <button key="positions" class="btn btn-primary add-button">+</button>
            </div>
        </div>
    </div>

    <!-- Locations -->
    <div class="col-md-12 mb-3">
        <div class="checkbox-container" title="Set the countries/places where you wish to work.">
            <span class="checkbox-container-label">Locations</span>
            <div id="locations_tag_container" class="tag-container mx-0 my-3 px-2">
                ${ returnTagHtml('locations')}
            </div>
            <div class="mx-0 my-3 px-2 add-container">
                <input id="locations_tag_input" type="text" class="form-control form--control" placeholder="Please input one country or place and click button"/>
                <button key="locations" class="btn btn-primary add-button">+</button>
            </div>
        </div>
    </div>
    <!-- Distance -->
    <div class="col-md-12 mb-4" title="Set Distance to determine the radius/distance from the place to search the job.">
        <label class="form-label">Distance (miles)</label>
        <div class="form--select">
            <select id="distance" key="distance" name="distance" class="form-select" onchange="onSelectChange(this)">
                <option ${data.distance === 0 ? 'selected' : '' } value=0> 0 </option>
                <option ${data.distance === 5 ? 'selected' : '' } value=5> 5 miles</option>
                <option ${data.distance === 10 ? 'selected' : '' } value=10> 10 miles</option>
                <option ${data.distance === 25 ? 'selected' : '' } value=25> 25 miles</option>
                <option ${data.distance === 50 ? 'selected' : '' } value=50> 50 miles</option>
                <option ${data.distance === 100 ? 'selected' : '' } value=100> 100 miles</option>
            </select>
        </div>
    </div>

    <!-- Company Blacklist -->
    <div class="col-md-6 mb-4">
        <div class="checkbox-container" title="Set Company Blacklist to prevent bot from applying in specific companies.">
            <span class="checkbox-container-label">Company Blacklist</span>
            <div id="companyBlacklist_tag_container" class="tag-container mx-0 my-3 px-2">
                ${ returnTagHtml('companyBlacklist')}
            </div>
            <div class="mx-0 my-3 px-2 add-container">
                <input id="companyBlacklist_tag_input" type="text" class="form-control form--control" placeholder="Please company name and click button"/>
                <button key="companyBlacklist" class="btn btn-primary add-button">+</button>
            </div>
        </div>
    </div>
    <!-- Title Blacklist -->
    <div class="col-md-6 mb-4">
        <div class="checkbox-container" title="Set Title Blacklist to prevent bot from applying on jobs containing black listed words in titles.">
            <span class="checkbox-container-label">Title Blacklist</span>
            <div id="titleBlacklist_tag_container" class="tag-container mx-0 my-3 px-2">
                ${ returnTagHtml('titleBlacklist')}
            </div>
            <div class="mx-0 my-3 px-2 add-container">
                <input id="titleBlacklist_tag_input"type="text" class="form-control form--control" placeholder="Please input one word and click button"/>
                <button key="titleBlacklist" class="btn btn-primary add-button">+</button>
            </div>
        </div>
    </div>

    <!-- Poster Blacklist -->
    <div class="col-md-12 mb-3">
        <div class="checkbox-container" title="Set Poster Blacklist to prevent bot from applying on jobs containing black listed words in titles.">
            <span class="checkbox-container-label">Poster Blacklist</span>
            <div id="posterBlacklist_tag_container" class="tag-container mx-0 my-3 px-2">
                ${ returnTagHtml('posterBlacklist')} 
            </div>
            <div class="mx-0 my-3 px-2 add-container">
                <input id="posterBlacklist_tag_input"type="text" class="form-control form--control" placeholder="Please input one word and click button"/>
                <button key="posterBlacklist" class="btn btn-primary add-button">+</button>
            </div>
        </div>
    </div>
    <!-- Resume -->
    <div class="col-md-12 mb-3">
        <label class="form-label">Resume *</label>
        <input parent="uploads" key="resume" type="file" name="" class="form-control form--control px-2" accept=".pdf" onchange="onFileLoad(this)">
    </div>
    <!-- Coverletter -->
    <div class="col-md-12 mb-4">
        <label class="form-label">Cover Letter</label>
        <input parent="uploads" key="coverLetters" id="cover_letter" type="file" name="cover_letter" class="form-control form--control px-2" accept=".pdf" onchange="onFileLoad(this)">
    </div>
    <!-- Additional checkboxes-->
    <div class="col-md-12 mb-3">
        <div class="checkbox-container">
            <span class="checkbox-container-label"  title="Update these fields to meet your specific needs as these would be used in all applications.">Additional Questions</span>
            <div class="row mx-0 my-3 px-2">
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="Do you have a valid driver's license?">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_driver_license" name="additional_driver_license" parent="checkboxes" key="driversLicence" ${data.checkboxes.driversLicence === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="additional_driver_license">Driver License</label>
                    </div>
                </div>
                    <!-- visa required -->
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="This is relative to the location and your citizenship applying above.">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_require_visa" name="additional_require_visa" parent="checkboxes" key="requireVisa" ${data.checkboxes.requireVisa === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="additional_require_visa">Visa Required</label>
                    </div>
                </div>
                    <!-- legally -->
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="Are you legally authorized to work in COUNTRY?">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_legally_authorized" name="additional_legally_authorized" parent="checkboxes" key="legallyAuthorized" ${data.checkboxes.legallyAuthorized === 1 ? 'checked': ''} onchange="onToggle(this)" />
                        <label class="form-check-label form-label m-0" for="additional_legally_authorized">Legally Authorized</label>
                    </div>
                </div>
                    <!-- urgent -->
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="We must fill this position urgently. Can you start immediately?">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_urgent_fill" name="additional_urgent_fill" parent="checkboxes" key="urgentFill" ${data.checkboxes.urgentFill === 1 ? 'checked': ''}  onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="additional_urgent_fill" checked>Urgent Fill</label>
                    </div>
                </div>
                    <!-- Commute -->
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="Are you comfortable commuting to this job's location?">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_commute_comfortable" name="additional_commute_comfortable" parent="checkboxes" key="commute" ${data.checkboxes.commute === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="additional_commute_comfortable">Commute</label>
                    </div>
                </div>
                    <!-- Remote -->
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="Are you comfortable working in a remote environment?">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_remote_comfortable" name="additional_remote_comfortable" parent="checkboxes" key="remote" ${data.checkboxes.remote === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="additional_remote_comfortable">Remote</label>
                    </div>
                </div>
                    <!-- drugTest -->
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="Are you comfortable taking a drug in accordance with local/state laws?">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_drug_test" name="additional_drug_test" parent="checkboxes" key="drugTest" ${data.checkboxes.drugTest === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="additional_drug_test">Drug Test</label>
                    </div>
                </div>
                    <!-- assessment -->
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="Are you willing to complete an assessment?">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_assessment" name="additional_assessment" parent="checkboxes" key="assessment" ${data.checkboxes.assessment === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="additional_assessment">Assessment</label>
                    </div>
                </div>
                    <!-- background check -->
                <div class="col-md-4 mb-1 p-0 flex-end">  
                    <div class="form-check form--check" title="Are you willing to undergo a background check, in accordance with local law/regulations?">
                        <input class="form-check-input custom--check" type="checkbox" id="additional_background_check" name="additional_background_check" parent="checkboxes" key="backgroundCheck" ${data.checkboxes.backgroundCheck === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label m-0" for="additional_background_check">Background Check</label>
                    </div>
                </div>
                <!-- degree -->
                <div class="col-md-12 my-3">
                    <div class="checkbox-container" title="Have you completed the following level of education: DEGREE TYPE?">
                        <span class="checkbox-container-label">Degrees</span>
                        <div id="degreeCompleted_tag_container" class="tag-container mx-0 my-3 px-2">
                            ${ returnTagHtml('degreeCompleted', 'checkboxes')}
                        </div>
                        <div class="mx-0 my-3 px-2 add-container">
                            <input id="degreeCompleted_tag_input" type="text" class="form-control form--control" placeholder="Please input one degree type and click button"/>
                            <button parent="checkboxes" key="degreeCompleted" class="btn btn-primary add-button">+</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- University GPA -->
    <div class="col-md-6 mb-3" title="Update value  by entering your GPA which must be a decimal value to one decimal point (e.g., 3.8 or 3.0)">
        <label class="form-label">University GPA</label>
        <input type="text" class="form-control form--control" key="universityGpa" placeholder="University GPA" value="3.8" value_type="float" onblur="onInputChange(this)"/>
    </div>
    <!-- Minimum Budget -->
    <div class="col-md-6 mb-3" title="Set minimum salary to specify the minimum expected salary. Keep the input to integer without decimals or commas or currency symbols.">
        <label class="form-label">Minimum Salary</label>
        <input type="text" class="form-control form--control" key="salaryMinimum" placeholder="Minimum Expected Salary" value_type="float" onblur="onInputChange(this)"/>
    </div>
    <!-- Languages -->
    <div class="col-md-12 mb-3">
        <div class="checkbox-container" title="Use this section to specify languages you speak with proficiency. Do not change these as LinkedIn expects specific values. Also, the language spelling must be the same as used in Linkedin">
            <span class="checkbox-container-label">Languages</span>
            <div class="mx-0 my-3 px-2 add-container">
                <input id="languageList_input" type="text" class="form-control form--control" placeholder="Please company name and click button"/>
                <button parent="languages" key="languageList" class="btn btn-primary select-add-button" onclick="onSelectAddButtonClicked(this)">+</button>
            </div>
            <div id="languageList_select_container" class="row px-2">
                ${returnSelectHtml('languageList', 'languages')}
            </div>
        </div>
    </div>
    <!-- Notice Period -->
    <div class="col-md-12 mb-4" title="Notice Period in weeks">
        <label class="form-label">Notice Period</label>
        <input type="text" class="form-control form--control" id="additional_notice_period" placeholder="Notice Period" key="noticePeriod" value_type="int" onblur="onInputChange(this)"/>
    </div>

    <!-- Year of Experience -->
    <div class="col-md-12 mb-3">
        <div class="checkbox-container" title="How many years of work experience do you have ...? (whole numbers only)">
            <span class="checkbox-container-label">Years of Experience</span>
            <div class="row px-2">
                <div class="w-50 my-3 mx-0" title="">
                    <label class="form-label">Normal Experiences</label>
                    <div class="form--select">
                        <select id="experience_normal_list" name="" class="form-select" parent="experience" key="experienceList" onchange="addExperienceClick(this, 'normal')" placeholder="Select One Experience">
                            
                        </select>
                    </div>
                </div>
                <div class="w-50 mx-0 my-3 px-2">
                    <label class="form-label">Custom Field</label>
                    <div class="add-container">
                        <input id="custom_experience_input" type="text" class="form-control form--control" placeholder="Please fill this field and click add button." title="Put for any industry/skill that you did not list"/>
                        <button class="btn btn-primary add-button" parent="experience" key="experienceList" onclick="addExperienceClick(this, 'custom')">+</button>
                    </div>
                </div>
            </div>
            
            <div id="experienceList_container" class="row px-2">
                
            </div>
        </div>
    </div>

    <!-- Personal Info -->
    <div class="col-md-12 mb-4">
        <div class="checkbox-container" title="How many years of work experience do you have ...? (whole numbers only)">
            <span class="checkbox-container-label">Personal Info</span>
            <div class="row px-2">
                <div class="col-md-6 my-3" title="">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control form--control" id="additional_first_name" placeholder="First Name" parent="personalInfo" key="First Name" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-6 my-3" title="">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control form--control" id="additional_last_name" placeholder="Last Name" parent="personalInfo" key="Last Name" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-6 mb-3" title="">
                    <label class="form-label">Phone Country Code</label>
                    <input type="text" class="form-control form--control" id="phone_country_code" placeholder="Phone Country Code" parent="personalInfo" key="Phone Country Code" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-6 mb-3" title="">
                    <label class="form-label">Mobile Phone Number</label>
                    <input type="text" class="form-control form--control" id="mobile_phone_number" placeholder="Mobile Phone Number" parent="personalInfo" key="Mobile Phone Number" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-6 mb-3" title="">
                    <label class="form-label">Street</label>
                    <input type="text" class="form-control form--control" id="" placeholder="Street" parent="personalInfo" key="Street Address" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-6 mb-3" title="">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control form--control" id="" placeholder="City" parent="personalInfo" key="City" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-6 mb-3" title="">
                    <label class="form-label">State</label>
                    <input type="text" class="form-control form--control" id="" placeholder="State" parent="personalInfo" key="State" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-6 mb-3" title="">
                    <label class="form-label">Zip Code</label>
                    <input type="text" class="form-control form--control" id="" placeholder="Zip Code" parent="personalInfo" key="Zip" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-12 mb-3" title="">
                    <label class="form-label">LinkedIn</label>
                    <input type="text" class="form-control form--control" id="" placeholder="LinkedIn" parent="personalInfo" key="Linkedin" onblur="onInputChange(this)"/>
                </div>

                <div class="col-md-12 mb-3" title="">
                    <label class="form-label">Website</label>
                    <input type="text" class="form-control form--control" id="" placeholder="Website" parent="personalInfo" key="Website" onblur="onInputChange(this)"/>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-12 mb-3">
        <div class="checkbox-container" title="How many years of work experience do you have ...? (whole numbers only)">
            <span class="checkbox-container-label">USA Employment Crap</span>
            <div class="row px-2 pt-3">
                <div class="col-md-3 col-sm-6 mb-2 flex-end">  
                    <div class="form-check form--check" title="">
                        <input class="form-check-input custom--check" type="checkbox" id="only_remote" name="only_remote"  parent="eeo" key="gender" ${data.eeo.gender === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label" for="only_remote">Gender</label>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 mb-2 flex-end">  
                    <div class="form-check form--check" title="">
                        <input class="form-check-input custom--check" type="checkbox" id="only_remote" name="only_remote"  parent="eeo" key="race" ${data.eeo.race === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label" for="only_remote">Race</label>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 mb-2 flex-end">  
                    <div class="form-check form--check" title="" >
                        <input class="form-check-input custom--check" type="checkbox" id="only_remote" name="only_remote" parent="eeo" key="vetran" ${data.eeo.vetran === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label" for="only_remote">Vetran</label>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 mb-2 flex-end">  
                    <div class="form-check form--check" title="">
                        <input class="form-check-input custom--check" type="checkbox" id="only_remote" name="only_remote"  parent="eeo" key="disability" ${data.eeo.disability === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label" for="only_remote">Disability</label>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 mb-2 flex-end">  
                    <div class="form-check form--check" title="">
                        <input class="form-check-input custom--check" type="checkbox" id="only_remote" name="only_remote"  parent="eeo" key="citizenship" ${data.eeo.citizenship === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label" for="only_remote">Citizenship</label>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 mb-2 flex-end">  
                    <div class="form-check form--check" title="">
                        <input class="form-check-input custom--check" type="checkbox" id="only_remote" name="only_remote"  parent="eeo" key="clearance" ${data.eeo.clearance === 1 ? 'checked': ''} onchange="onToggle(this)"/>
                        <label class="form-check-label form-label" for="only_remote">Clearance</label>
                    </div>
                </div>
            </div>                                        
        </div>
    </div>

    <div class="col-md-12">
        <button id="submit-button" type="submit" class="base-btn w-100">
            SUBMIT
        </button>
    </div>
    `
    $('#profile_container').html(profileHtml);
}

initHtml()
updateNormalExperienceList()
//set button listener after html init
//I have to fix this next version, not event, this object.
$('.add-button').on('click', e=> {
    onAddButtonClick(e)
})
