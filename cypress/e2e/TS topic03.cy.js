
// remove no check once Cypress.sinon is typed
// https://github.com/cypress-io/cypress/issues/6720

import { AnyAaaaRecord } from "dns"

describe('Topic12_TestSuite', () => {

    it('cy.spy() - wrap a method in a spy', () => {
      // https://on.cypress.io/spy
      cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')
  
      const obj = {
        foo () {},
      }
  
      const spy = cy.spy(obj, 'foo').as('anyArgs')
  
      obj.foo()
  
      expect(spy).to.be.called
    })
 
})