#READ ME
------------------------------
#FRAMEWORK: 

1. It is Page Object Pattern using Cucumber & Protractor. 
2. **Structure**:
   -**Project Folder**
        -**Common Library** - Which consists of common utilities code
        -**node_modules** - Dev node modules for the project
        -**resources** - Contains the extra resources required for project
        -**page objects** - contains modules for each page 
        -**test-reports** - Directory contains test reports & screenshots. 
        -**test-sceanrios** - contains feature file & step definations. 
     -**Conf file**- Main configuration files used for running the project
     -**package.json** - Is the file contains all the information about packages & dependencies required. 
     

#HOW TO RUN
1. Git clone to te code from the GitHub Repository
2. Open command prompt (CMD)- Go to the project folder. 
3. Use Package.json to install all dependencies (Install NodeJS if not installed)
4. Go to resources folder - rename the chromedriver file to chromedriver.exe
4. Now fire command : protractor config.js to start running the test. 


#HOW TO VIEW REPORTS
1. Open file explorer
2. Go to the project folder.
3  Navigate to -->> test_reports --> html_reports --> report --> index.html
4. Open index.html in Browser. 


#HOW TO DO CI ( Have done on local & tested)
We can use Jenkins.
1. Need to create a JOB. 
2. In JOB the first step would be download the code from GitHub Repo
3. In JOB Second Step would be run windows shell script as mentioned below
    Line 1. CD to the JOB folder, 
    Line 2. CD to Move down the project folder
    Line 3. Do run "webdriver-manager update"
    Line 4. Do run "webdriver-manager start"
    line 5. Do run "protractor config.js"
  
4. We can steup email on build sucess & failure also in Jenkins. 