//var protractor = require('protractor');
var assert = require('assert');
var protractor = require('protractor');
var browser = protractor.browser;
var fs = require('fs');

exports.protractor_common= {

    check_click : function (element, time_out ) {
        var exp_cond = protractor.ExpectedConditions;
        browser.wait(exp_cond.visibilityOf(element),time_out);
        browser.wait(exp_cond.elementToBeClickable(element),time_out);
        element.click().then(function () {
            console.log("Web Element Clicked");
        });
    },

    check_enter_text :function (element,text, time_out ) {
        var exp_cond = browser.ExpectedConditions;
        browser.wait(exp_cond.presenceOf(element),time_out);
        browser.wait(exp_cond.visibilityOf(element),time_out);
        element.clear();
        element.sendKeys(text).then(function () {
            console.log("Text Entered");
        })
    },

    check_element_visible : function(element,time_out)
    {
        var exp_cond = browser.ExpectedConditions;
        browser.wait(exp_cond.visibilityOf(element),time_out);
        browser.wait(exp_cond.elementToBeClickable(element),time_out);
        assert(element.isDisplayed());
    },

    takeTheScreenshot: function (screenshot_name) {
        browser.driver.takeScreenshot().then(function (png) {
           writeScreenShot(png,screenshot_name);
        });
    },

    close_browser : function () {
        browser.driver.quit().then(function () {
            console.log("Browser Closed compltetely");
        });
    },

    restartTheBrowser : function(){
        browser.restart().then(function () {
            console.log("Browser is restarted");
        });

    },
    quitTheBrowser : function () {
        browser.quit();
    },

    closeTheBrwoserInstance : function () {
        browser.close();
    },

    reSizeBrowserWindow : function (width,height) {
        browser.manage().window().setSize(width,height).then(function () {
            console.log("Window re-sized to : "+width+" & :"+height);
        })
    },


    moveMouseToPositionWithElement : function(equity_element,position){
        console.log("Position to move -:"+position);
        browser.actions()
            .mouseMove(equity_element)
            .mouseDown()
            .mouseMove(equity_element, {x: position, y: 0}) // 100px from left, 100 px from top of plot0
            .mouseUp()
            .perform().then(function () {
            console.log("Mouse moved to a Perticular place");
         });
    },

    verifyElementAttributeValue : function (element, attribute_name, expected_value) {
        console.log("Expected value :-"+expected_value);
        element.getAttribute(attribute_name).then(function (actual_value) {
            console.log("Actual value :-"+actual_value);
            assert(actual_value===expected_value);
        })
    },

    pressAKeyKeyboard : function(key){
        switch (key) {
            case "enter":
                browser.actions().sendKeys(protractor.Key.ENTER).perform().then(function () {
                    console.log("Enter Key Pressed")
                });
                break;
            case "page-down":
                browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform().then(function () {
                    console.log("Page Down Key Pressed")
                });
                break;
            default:
        }
    },

    getTheSubStringBetween : function(char_one, char_two, str)
    {
       var start_index = str.indexOf(char_one);
       console.log("Starting point of slice:"+ start_index);
       var end_index = str.indexOf(char_two);
       var LenExtrat = end_index-start_index-1;
       console.log("End point of slice:"+ end_index);
       return str.substr(start_index+1,LenExtrat);
    }
};

function writeScreenShot(png, filename) {
    var filePath = "test_reports/screenshots/";
    filename = filePath+filename+'.png';
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(png, 'base64'));
    stream.end();
}


