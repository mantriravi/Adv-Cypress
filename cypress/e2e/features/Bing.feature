# Amazon search functionality feature file

Feature: Bing Test Suite
    This feature file will validate title of home page and search functionality

    Background: setupblock
        Given User is on Bing home page


    @sanity
    Scenario: Title Validation
        It will validate the title of home page

        When User click on search
        And User search "Cypress"
        And click on "cypress"
        Then title should contain "About 12,80,00,000 results"


  