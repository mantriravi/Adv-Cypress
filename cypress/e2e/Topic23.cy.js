var tasktimeout

describe('Topic23_TestSuite', () => {

  beforeEach(() => {
    tasktimeout = Cypress.config("taskTimeout")
    cy.log("TaskTimeout Original - " + tasktimeout)

    Cypress.config("taskTimeout", 180000)
    cy.log("TaskTimeout Modified - " + Cypress.config("taskTimeout"))
  })

  afterEach(() => {
    Cypress.config("taskTimeout", tasktimeout)
    cy.log("TaskTimeout Resetted to Original - " + Cypress.config("taskTimeout"))
  })

  const thresholds = {
    performance: 50,
    accessibility: 80,
    'first-contentful-paint': 5000,
    'largest-contentful-paint': 10000,
    interactive: 6000,
    seo: 50,
    pwa: 0,
  };

  const lighthouseConfig = {
    formFactor: 'desktop',
    screenEmulation: { disabled: true },
  };



it('BlazeDemo_ClientSide_UI_PerformanceTesting', () => {
  cy.visit('https://bing.com')
  //Cypress.config()
  cy.lighthouse(thresholds, lighthouseConfig)
})

})





