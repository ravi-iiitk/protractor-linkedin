Feature: Customer Login for XYZ Bank
  Scenario: Verify that user can login and see transations
    Given I am on webpage
    When I click on customer
    Then I see the user name dropdown
    And I select the user
    And click on login
    Then I must see the logged in user name displayed.

