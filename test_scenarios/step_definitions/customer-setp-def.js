
var {Given} = require('cucumber');
var {When} = require('cucumber');
var {Then} = require('cucumber');
var  customer =  require('../../page_objects/customer');

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 100000);


Given('I am on webpage', function () {
    // Write code here that turns the phrase above into concrete actions
    customer.customer.login();
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});


When('I click on customer', function () {
    // Write code here that turns the phrase above into concrete actions
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

Then('I see the user name dropdown', function () {
    // Write code here that turns the phrase above into concrete actions
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

Then('I select the user', function () {
    // Write code here that turns the phrase above into concrete actions
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

Then('click on login', function () {
    // Write code here that turns the phrase above into concrete actions
    return browser.getTitle().then(function(text){
        console.log('Title of Web Page is -: ' + text);
    });
});

Then('I must see the logged in user name displayed.', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
