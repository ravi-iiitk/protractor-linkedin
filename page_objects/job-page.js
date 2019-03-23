var protractor = require('protractor');
var element = protractor.browser.element;
var assert = require('assert');
var commonlib =  require("../common_library/protractor_common.js");
const desiredURL = "https://www.linkedin.com/";
var keyWordsArray = ['Automation testing', 'QA','Test Architect','Test','QA Architect','Senior QA Architect','SDET','Test Manager','Test Lead','Automation Developer','Automation Architect','Quality Assurance','Test Analyst','Automation Lead','Automation Lead Developer','Software Test Engineer','QA Automation Lead','QA Engineer','Software Development Engineer in Test','Quality Assurance Analyst','Sr Test Automation Engineer'];
var locArray = ['Chennai','Hyderabad','Noida','Puducherry','Gurgaon','Mumbai','Telang','Pune','MH','Ghaziabad','Vadodara','Visakhapatnam','Mohali','Chandigarh','Udaipur' ,'Ahmedabad','Gurugram','Coimbatore','Delhi',];
var search_keyword= 'Automation testing';
var loc_area = 'Worldwide';



exports.jobpage={

    job_tab : element(by.xpath("//span[@class='nav-item__title'][contains(text(),'Jobs')]")),

    searchkeyword_text_field : element(by.xpath("//input[contains(@id,'jobs-search-box-keyword')]")),

    searchloc_text_field : element(by.xpath("//input[contains(@id,'jobs-search-box-location-id')]")),

    search_button : element(by.xpath("//button[@class='jobs-search-box__submit-button button-secondary-large']")),

    linked_feature_filter : element(by.xpath("//h3[text()='LinkedIn Features']")),

    easy_apply_filter : element(by.xpath("//p[@class='search-s-facet-value__text display-flex']//span[text()='Easy Apply']")),

    apply_button_filter : element.all(by.xpath("//button[contains(@data-control-name,'filter_pill_apply')]//span[text()='Apply']")).get(1),

    all_job_heading : element.all(by.xpath("//li[contains(@id,'ember')]//h3[contains(@id,'ember')]/a")),

    all_job_locations : element.all(by.xpath("//li[contains(@id,'ember')]//h5[contains(@id,'ember')]")),

    apply_button : element(by.xpath("//span[@class='jobs-apply-button__text']")),

    doSearch : function () {
        commonlib.protractor_common.check_click(this.job_tab,15);
        browser.sleep(3000);
        commonlib.protractor_common.check_enter_text(this.searchkeyword_text_field,search_keyword,15);
        commonlib.protractor_common.check_enter_text(this.searchloc_text_field,loc_area,15);
        browser.sleep(3000);
        commonlib.protractor_common.check_click(this.search_button,15);
        browser.sleep(7000);
    },

    filterJob : function () {
        commonlib.protractor_common.check_click(this.linked_feature_filter,15);
        browser.sleep(3000);
        commonlib.protractor_common.check_click(this.easy_apply_filter,15);
        browser.sleep(3000);
        commonlib.protractor_common.check_click(this.apply_button_filter,15);
        browser.sleep(5000);
    },

    applyJob : function () {
        var pageCounter = 1;
        applyForJobEachPage(pageCounter);
    }
};


function applyForJobEachPage(pageCounter) {
    var currentPage = element(by.xpath("//li[@class='artdeco-pagination__indicator artdeco-pagination__indicator--number active selected']/span"));
    currentPage.getText().then(function (currentPage) {
        console.log("Current Page is : Page No :-"+currentPage);
        console.log("Page Counter is :-"+pageCounter);
        var nextPage = Number(currentPage)+1;
        console.log("Value of NextPage:"+nextPage);
        if(pageCounter!==1 && pageCounter!==9  )
        {
            var xpath_page = "//button[@aria-label='Page "+pageCounter+"']";
            var this_page = element(by.xpath(xpath_page));
            if(this_page.isPresent())
            {
                if(this_page.isDisplayed())
                    commonlib.protractor_common.check_click(this_page,15);

            }
            browser.sleep(5000);
            var firstJob = element.all(by.xpath("//li[contains(@id,'ember')]//h3[contains(@id,'ember')]/a")).get(0);
            commonlib.protractor_common.check_click(firstJob,15);
            browser.sleep(3000);
        }
        else if(pageCounter===9 )
        {
            var dotdot = element(by.xpath("//span[contains(text(),'…')]"));
            commonlib.protractor_common.check_click(dotdot,15);
            firstJob = element.all(by.xpath("//li[contains(@id,'ember')]//h3[contains(@id,'ember')]/a")).get(0);
            commonlib.protractor_common.check_click(firstJob,15);
            browser.sleep(5000);
        }
        scrollTillBottomLeft(1);
        var all_job_heading = element.all(by.xpath("//li[contains(@id,'ember')]//h3[contains(@id,'ember')]/a"));
        all_job_heading.count().then(function (no_jobs_list) {
            console.log("Number of Jobs :"+no_jobs_list);
            for(var job_counter=0;job_counter<no_jobs_list;job_counter++)
            {
                browser.sleep(1000);
                checkJobIsThere(pageCounter,job_counter);

            }
        });
        pageCounter = pageCounter+1;
        if(pageCounter<=40)
            applyForJobEachPage(pageCounter);
    });

}




function checkJobIsThere(pageCounter,job_counter) {
    var all_job_heading = element.all(by.xpath("//li[contains(@id,'ember')]//h3[contains(@id,'ember')]/a"));
    var this_heading = all_job_heading.get(job_counter);
    commonlib.protractor_common.check_click(this_heading,15);
    browser.sleep(1000);
    this_heading.getText().then(function (job_title) {
        console.log("The Job title is :"+job_title);
        if(checkValue(job_title,keyWordsArray))
        {
            console.log("I am going inside the job match ");
            browser.sleep(1000);
            locationCheckandApply(pageCounter,job_counter)
        }
    })
}

function locationCheckandApply(pageCounter,job_counter) {
    var all_job_location = element.all(by.xpath("//li[contains(@id,'ember')]//h5[contains(@id,'ember')]"));
    var this_job_loc = all_job_location.get(job_counter);
    this_job_loc.getText().then(function (job_loc) {
        if(checkValue(job_loc,locArray)===false)
        {
            element(by.xpath("//span[@class='jobs-apply-button__text']")).isPresent().then(function (isPresent) {
                if(isPresent)
                {
                    var apply_button = element(by.xpath("//span[@class='jobs-apply-button__text']"));
                    apply_button.isDisplayed().then(function (isDisplayed) {
                        if(isDisplayed)
                        {
                            commonlib.protractor_common.check_click(apply_button,15);
                            browser.sleep(3000);
                            element(by.xpath("//button[@type='submit']")).isPresent().then(function (isPresent) {
                                var submitBtn = element(by.xpath("//button[@type='submit']"));
                                if(isPresent)
                                {
                                    commonlib.protractor_common.check_click(submitBtn,15);
                                    browser.sleep(5000);
                                    var crossButton = element(by.xpath("//button[@class='artdeco-dismiss']//*[@class='artdeco-icon']"));
                                    commonlib.protractor_common.check_click(crossButton,15);
                                    browser.sleep(5000);
                                }
                                else
                                {
                                    element(by.xpath("//button[@class='artdeco-dismiss']//*[@class='artdeco-icon']")).isPresent().then(function (isCrossPresent) {
                                        if(isCrossPresent)
                                        {
                                            var crossButton = element(by.xpath("//button[@class='artdeco-dismiss']//*[@class='artdeco-icon']"));
                                            commonlib.protractor_common.check_click(crossButton,15);
                                            browser.sleep(5000);
                                        }
                                        else
                                        {
                                            applyOtherTab(pageCounter);
                                        }
                                    });
                                }
                            })
                        }
                    });

                }

            });
        }
    });
}

function applyOtherTab(pageCounter) {
    browser.getAllWindowHandles().then(function(handles) {
        browser.sleep(5000);
        var newTabHandle = handles[1];
        browser.switchTo().window(newTabHandle).then(function () {
            browser.sleep(5000);
            // Expect the newly opened tab URL to equal the href of the invitation
            var submit_new_tab = element(by.xpath("//button[@type='submit']"));
            commonlib.protractor_common.check_click(submit_new_tab,15);
            browser.sleep(10000);
            browser.driver.close().then(function () {
                browser.driver.switchTo().window(handles[0]).then(function () {
                    browser.sleep(15000);
                    applyForJobEachPage(pageCounter);
                });
            });
        });
    });
}
function scrollTillBottomLeft(count) {
    element.all(by.xpath("//div[@data-control-name='A_jobssearch_job_result_click']")).count().then(function (noOfJobs) {
       var lastJobLink= element.all(by.xpath("//div[@data-control-name='A_jobssearch_job_result_click']")).get(noOfJobs-1);
       var firstJobLink = element.all(by.xpath("//div[@data-control-name='A_jobssearch_job_result_click']")).get(0);
       commonlib.protractor_common.check_click(lastJobLink,15);
       console.log("The No of Jobs nos is : "+noOfJobs);
       browser.actions().mouseMove(lastJobLink).click().perform();
       if(count>=9)
       {
           commonlib.protractor_common.check_click(firstJobLink,15);
           browser.sleep(2000);
           return noOfJobs;
       }
       else
       {
           count++;
           console.log("The value of count is : "+count);
           scrollTillBottomLeft(count);
       }
    });
}


function checkValue(value,arr){
    var status = false;
    for(var i=0; i<arr.length; i++){
        var name = arr[i];
        if(value.indexOf(name)>-1){
            console.log("Value is :"+value);
            console.log("Name is :"+name);
            status = true;
            break;
        }
    }
    return status;
}


