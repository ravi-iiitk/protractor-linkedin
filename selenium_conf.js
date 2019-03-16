var selenium = require('selenium-standalone');
var cb  = require('selenium-standalone');

exports.setup = {
    intallTheSeleniumServer : function()
    {
        selenium.install({
            // check for more recent versions of selenium here:
            // https://selenium-release.storage.googleapis.com/index.html
            version: '3.8.1',
            baseURL: 'https://selenium-release.storage.googleapis.com',
            drivers: {
                chrome: {
                    // check for more recent versions of chrome driver here:
                    // https://chromedriver.storage.googleapis.com/index.html
                    version: '2.39',
                    arch: process.arch,
                    baseURL: 'https://chromedriver.exe.storage.googleapis.com'
                },
                ie: {
                    // check for more recent versions of internet explorer driver here:
                    // https://selenium-release.storage.googleapis.com/index.html
                    version: '3.9.0',
                    arch: process.arch,
                    baseURL: 'https://selenium-release.storage.googleapis.com'
                }
            },
            proxy: 'http://localproxy.com', // see https://github.com/request/request#proxies
            requestOpts: { // see https://github.com/request/request#requestoptions-callback
                timeout: 10000
            },
            logger: function(message) {

            },
            progressCb: function(totalLength, progressLength, chunkLength) {

            }
        }, cb)

    },

    startTheServer : function ()
    {
        selenium.start(function(err, child) {
            child.stderr.on('data', function(data){
                console.log(data.toString());
            });
        })

    }
};

