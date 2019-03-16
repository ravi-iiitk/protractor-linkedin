Feature: Apply for JOBs in linkedin
  Scenario: Apply for job for Bengaluru
    Given I am on home page
    When I login
    Then I go to job search page
    And I search job
    And I filter the jobs
    Then I apply for all relevent jobs.