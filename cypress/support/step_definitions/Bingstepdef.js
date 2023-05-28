import { Given,When,Then, Before, After } from "@badeball/cypress-cucumber-preprocessor"


Before(()=>{
    cy.log("Before Hook....")
})

After(()=>{
    cy.log("After Hook....")
})

Given("User is on Bing home page",()=>{
    cy.visit("https://bing.com")
})

When("User click on search",()=>{
    cy.get(".sb_form_q.sb_form_ta").click()
    cy.wait(2000)
})

When("User search {string}",(product)=>{
    cy.get(".sb_form_q.sb_form_ta").type(product)
  
})

When("click on {string}",(product)=>{
    cy.contains("cypress").click({force:true})
    cy.wait(2000)
})

Then("title should contain {string}",(keyword)=>{
    cy.get(".sb_count").should("contain",keyword)
})
