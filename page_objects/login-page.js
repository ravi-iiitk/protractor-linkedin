var protractor = require('protractor');
var browser = protractor.browser;
var element = protractor.browser.element;
var assert = require('assert');
var commonlib =  require("../common_library/protractor_common.js");
const desiredURL = "https://www.linkedin.com/";
var user_id = 'rsk.ravi@gmail.com';
var pwd = 'B@buL1nkedinPwd';

exports.loginpage ={
  email_text_field : element(by.id("login-email")),
  pwd_text_field : element(by.id("login-password")),
  sign_in_button : element(by.id("login-submit")),

  doLogin : function () {
      commonlib.protractor_common.check_enter_text(this.email_text_field,user_id,15);
      commonlib.protractor_common.check_enter_text(this.pwd_text_field,pwd,15);
      commonlib.protractor_common.check_click(this.sign_in_button,15);
  },

  goToURL : function () {
      browser.ignoreSynchronization = true;
      browser.get(desiredURL).then(function () {
          browser.driver.manage().window().maximize();
      });
  }

};
