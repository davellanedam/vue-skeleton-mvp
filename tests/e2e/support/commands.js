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
Cypress.Commands.add('login', (email) => {
  cy.visit('/login')
  cy.get('input[name=email]').should('be.visible').clear().type(email)
  cy.get('input[name=password]')
    .should('be.visible')
    .clear()
    .type('12345{enter}')

  // url should be home
  cy.url().should('include', '/home')
})

Cypress.Commands.add('logout', () => {
  // Logout
  cy.get('button.btnLogout').should('be.visible').click()
  // url should be login
  cy.url().should('include', '/login')
})

Cypress.Commands.add('setLocaleToEN', () => {
  cy.get('button.btnLocaleActivation').should('be.visible').click()
  cy.get('div.btnEN').should('be.visible').click()
})

Cypress.Commands.add('setLocaleToES', () => {
  cy.get('button.btnLocaleActivation').should('be.visible').click()
  cy.get('div.btnES').should('be.visible').click()
})

Cypress.Commands.add('setLocaleToCN', () => {
  cy.get('button.btnLocaleActivation').should('be.visible').click()
  cy.get('div.btnCN').should('be.visible').click()
})

Cypress.Commands.add('setLocaleToFR', () => {
  cy.get('button.btnLocaleActivation').should('be.visible').click()
  cy.get('div.btnFR').should('be.visible').click()
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
