
var jsonReportFile = 'test_reports/html_reports/cucumber_report.json';
var reporter = require('cucumber-html-reporter');

exports.config = {

    //seleniumAddress: 'http://localhost:4444/wd/hub', // This is targetting your local running instance of the selenium webdriver

    /*seleniumServerJar:'resources/selenium-server-standalone-3.141.59.jar',
    seleniumPort: 4444,
    seleniumArgs: ['-browserTimeout=60'],*/
    specs: [
        'test_scenarios/feature_files/customer-login.feature'
    ],
    directConnect: true,
    chromeDriver:'resources/chromedriver.exe',
    capabilities: {
        browserName: 'chrome' ,// You can use any browser you want. On a CI environment you're going to want to use PhantomJS
        chromeOptions: {
            args: ['disable-infobars']
        },
        // Add this
        metadata: {
            browser: {
                name: 'chrome',
                version: '72.0.3626.119'
            },
            device: 'Acer Aspire ES1-531',
            platform: {
                name: 'Windows',
                version: '10'
            }
        },

    },

    framework: 'custom', //We need this line to use the cucumber framework

    frameworkPath: require.resolve('protractor-cucumber-framework'), // Here it is

    cucumberOpts: {
        format: 'json:'+jsonReportFile,
        strict: true,
        require: 'test_scenarios/step_definitions/customer-setp-def.js',
        tags: false,
        profile: false,
        'no-source': true,
    },

    params: {
        env: {
            hostname: 'http://0.0.0.0:8000' // Whatever the address of your app is
        },
    },

    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',

            options:{
                // read the options part for more options
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                openReportInBrowser:true,
                displayDuration:true,

                customData: {
                    title: 'Test Execution Information',
                    data: [
                        {label: 'Project', value: 'WeInvest Test Automation'},
                        {label: 'Release', value: '1.0'},
                        {label: 'Cycle', value: '1'}
                    ]
                }
            }
        },
    ],

    ignoreUncaughtExceptions: true,
    untrackOutstandingTimeouts: true

};
