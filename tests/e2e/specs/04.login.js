import faker from 'faker'

describe('Login', () => {
  it('Visits the login url', () => {
    cy.visit('/login')
    // url should be /login
    cy.url().should('include', '/login')
  })
  it('Checks input types', () => {
    cy.visit('/login')
    // Checks input type is email
    cy.get('input[name=email]')
      .invoke('attr', 'type')
      .should('contain', 'email')
    // Checks input type is password
    cy.get('input[name=password]')
      .invoke('attr', 'type')
      .should('contain', 'password')
  })
  it('Displays errors when user does not exist', () => {
    cy.visit('/login')
    cy.setLocaleToEN()
    cy.get('input[name=email]')
      .clear()
      .type(faker.internet.email())
    cy.get('input[name=password]')
      .clear()
      .type('password123{enter}')

    cy.get('div.error')
      .should('be.visible')
      .contains('User does not exists')
    // and still be on the same URL
    cy.url().should('include', '/login')
  })
  it('Displays errors when password is wrong', () => {
    cy.visit('/login')
    cy.setLocaleToEN()
    cy.get('input[name=email]')
      .clear()
      .type('admin@admin.com')
    cy.get('input[name=password]')
      .clear()
      .type('password123{enter}')

    cy.get('div.error')
      .should('be.visible')
      .contains('Wrong password')
    // and still be on the same URL
    cy.url().should('include', '/login')
  })
  it('Login', () => {
    cy.visit('/login')
    cy.get('input[name=email]')
      .clear()
      .type('admin@admin.com')
    cy.get('input[name=password]')
      .clear()
      .type('12345{enter}')
    // url should be home
    cy.url().should('include', '/home')

    // Logout
    cy.get('button.btnLogout')
      .should('be.visible')
      .click()
    // url should be login
    cy.url().should('include', '/login')
  })
  it('Go to forgot password', () => {
    cy.visit('/login')
    cy.get('a.btnForgotPassword')
      .should('be.visible')
      .click()
    // url should be forgot
    cy.url().should('include', '/forgot')
  })
})
