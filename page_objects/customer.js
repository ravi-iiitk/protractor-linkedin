var protractor = require('protractor');
var element = protractor.browser.element;
var browser = protractor.browser;
var assert = require('assert');

exports.customer = {

    customerLoginBtn : element(by.xpath("//button[contains(text(),'Customer Login')]")),
    customerSelect : element(by.name("userSelect")),
    loginBtn : element(by.xpath("//button[@type='submit']")),
    userName  :   element(by.className("fontBig ng-binding")),
    transaction  :   element(by.xpath("//button[contains(text(),'Transactions')]")),
    optionsCustomer  :   element.all(by.tagName('option')),
    yourNameOptionValue  :   element(by.xpath("//select[@id='userSelect']/option[1]")),
    backButton  :   element(by.xpath("//button[contains(text(),'Back')]")),
    depositBtn  :   element(by.xpath("//button[contains(text(),'Deposit')]")),
    depositField  :   element(by.xpath("//input[@placeholder='amount']")),
    depositAmtBtn  :   element(by.xpath("//button[@type='submit']")),
    depositMsg  :   element(by.className("error ng-binding")),
    withDrwalBtn  :   element(by.xpath("//button[contains(text(),'Withdrawl')]")),
    transactinTable  :   element(by.className("table table-bordered table-striped")),
    tbody  :   element(by.tagName("tbody")),

    login : function () {
        var XLSX = require('xlsx');
        var workbook = XLSX.readFile('test-data.xlsx');
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        console.log(xlData);
        var customerToSelec=xlData[0].UserName;
        var depositAmnt=xlData[0].Deposit;
        var withAmnt=xlData[0].Withdraw;
        console.log("The customer is :"+customerToSelec);
        console.log("The Withdrawal is :"+withAmnt);
        console.log("The Deposit is :"+depositAmnt);
        browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/login");
        browser.driver.manage().window().maximize();
        waitForAnELement(this.customerLoginBtn,20);
        this.customerLoginBtn.click();
        browser.actions().mouseMove(this.customerSelect).click().perform();
        waitForAnELement(this.customerSelect,20);
        selectDropdownbyNum(this.customerSelect,2);
        waitForAnELement(this.loginBtn,30);
        this.loginBtn.click();
        waitForAnELement(this.userName,30);
        this.userName.getText().then(function (actualUserName) {
            console.log("The customer is :"+customerToSelec),
            assert.equal(actualUserName,customerToSelec,"Name of customer does not matches.");
        });
        waitForAnELement(this.transaction,30);
        this.transaction.click();
        waitForAnELement(this.backButton,30);
        this.backButton.click();
        browser.sleep(2000);
        waitForAnELement(this.depositBtn,60);
        this.depositBtn.click();
        waitForAnELement(this.depositField,20);
        this.depositField.sendKeys(depositAmnt);
        waitForAnELement(this.depositAmtBtn,30);
        this.depositAmtBtn.click();
        waitForAnELement(this.depositMsg,30);
        this.depositMsg.getText().then(function (messge) {
            assert.equal(messge,"Deposit Successful","Deposit was not sucessful");
        });
        waitForAnELement(this.withDrwalBtn,30);
        this.withDrwalBtn.click();
        waitForAnELement(this.depositField,20);
        this.depositField.sendKeys(withAmnt);
        waitForAnELement(this.depositAmtBtn,30);
        this.depositAmtBtn.click();
        this.depositMsg.getText().then(function (messge) {
            assert.equal(messge,"Transaction successful","Deposit was not sucessful");
        });
        waitForAnELement(this.transaction,30);
        browser.sleep(2000);
        this.transaction.click();
        waitForAnELement(this.transactinTable,30);

        browser.sleep(2000);

        var rows = element.all(by.repeater('tx in transactions | orderBy:sortType:sortReverse | sDate:startDate:end')).count().then(function (noRows) {
            console.log("No of rows"+noRows);
            for(var i=0;i<noRows;i++)
            {
                var rows = element.all(by.repeater('tx in transactions | orderBy:sortType:sortReverse | sDate:startDate:end'));
                var cells = rows.get(i).all(by.tagName('td'));

                var cellTexts = cells.map(function (elm) {
                    return elm.getText();
                });

                cellTexts.then(function (allTexts) {
                    var myMap = new Map();
                    console.log(allTexts[1]);
                    console.log(allTexts[2]);
                    myMap.set(allTexts[2],allTexts[1]);
                    compare(myMap);
                })
            }
            function compare(myMap) {
                console.log(myMap.get("Credit"));
                console.log(myMap.get("Debit"));
                if(myMap.get("Credit")!==undefined)
                {
                    assert.equal(depositAmnt,myMap.get("Credit"));
                }
                if(myMap.get("Debit")!==undefined)
                {
                    assert.equal(withAmnt,myMap.get("Debit"));
                }
            }
        });
        browser.sleep(2000);
        }
        //Get all the rows data [1st and 2nd column]
};

function selectDropdownbyNum ( element, optionNum ) {
    if (optionNum){
        var options = element.all(by.tagName('option'))
            .then(function(options){
                waitForAnELement(options[optionNum],20);
                options[optionNum].click();
            });
    }
}

function waitForAnELement(element,time_out) {
    var exp_cond = browser.ExpectedConditions;
    browser.wait(exp_cond.presenceOf(element),time_out);
    browser.wait(exp_cond.visibilityOf(element),time_out);
}
