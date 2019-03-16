var {Given} = require('cucumber');
var {When} = require('cucumber');
var {Then} = require('cucumber');
var  job_page =  require('../../page_objects/job-page');
var  login_page =  require('../../page_objects/login-page');

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 10000000);

Given('I am on home page', function () {
    // Write code here that turns the phrase above into concrete actions
    login_page.loginpage.goToURL();
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

When('I login', function () {
    // Write code here that turns the phrase above into concrete actions
    login_page.loginpage.doLogin();
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

Then('I go to job search page', function () {
    // Write code here that turns the phrase above into concrete actions

    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

Then('I search job', function () {
    // Write code here that turns the phrase above into concrete actions
    job_page.jobpage.doSearch();
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

Then('I filter the jobs', function () {
    // Write code here that turns the phrase above into concrete actions
    job_page.jobpage.filterJob();
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

Then('I apply for all relevent jobs.', function () {
    // Write code here that turns the phrase above into concrete actions
    job_page.jobpage.applyJob();
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});
