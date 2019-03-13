// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', email => {
  cy.visit('/login')
  cy.get('input[name=email]')
    .clear()
    .type(email)
  cy.get('input[name=password]')
    .clear()
    .type('12345{enter}')

  // url should be home
  cy.url().should('include', '/home')
})

Cypress.Commands.add('setLocaleToEN', () => {
  cy.get('button.btnLocaleActivation')
    .should('be.visible')
    .click()
  cy.get('div.btnEN')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('setLocaleToES', () => {
  cy.get('button.btnLocaleActivation')
    .should('be.visible')
    .click()
  cy.get('div.btnES')
    .should('be.visible')
    .click()
})

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
