import faker from 'faker'

describe('Signup', () => {
  it('Visits the signup url', () => {
    cy.visit('/signup')
    cy.setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .contains('Signup')
    // url should be /signup
    cy.url().should('include', '/signup')
  })
  it('Checks input types', () => {
    cy.visit('/signup')
    cy.setLocaleToEN()
    // Checks input type is email
    cy.get('input[name=email]')
      .invoke('attr', 'type')
      .should('contain', 'email')
    // Checks input type is password
    cy.get('input[name=password]')
      .invoke('attr', 'type')
      .should('contain', 'password')
    // Checks input type is password for confirm password
    cy.get('input[name=confirmPassword]')
      .invoke('attr', 'type')
      .should('contain', 'password')
  })
  it('Displays errors when user already exists', () => {
    cy.setLocaleToEN()
    cy.get('input[name=name]')
      .clear()
      .type('Another User')
    cy.get('input[name=email]')
      .clear()
      .type('admin@admin.com')
    cy.get('input[name=password]')
      .clear()
      .type('12345')
    cy.get('input[name=confirmPassword]')
      .clear()
      .type('12345{enter}')

    cy.get('div.error')
      .should('be.visible')
      .contains('E-mail already exists')

    // and still be on the same URL
    cy.url().should('include', '/signup')
  })
  it('Signup', () => {
    cy.setLocaleToEN()
    cy.get('input[name=name]')
      .clear()
      .type('Another User')
    cy.get('input[name=email]')
      .clear()
      .type(faker.internet.email())
    cy.get('input[name=password]')
      .clear()
      .type('12345')
    cy.get('input[name=confirmPassword]')
      .clear()
      .type('12345{enter}')

    // url should be home
    cy.url().should('include', '/home')

    cy.get('h1')
      .should('have.class', 'display-2')
      .contains('Protected Home')

    // Accept to verify account
    cy.get('div.dlgVerifyAccount').and(
      'contain',
      'IMPORTANT: Verify your account'
    )

    // Close dialog
    cy.get('button.btnClose')
      .should('be.visible')
      .click()

    // Logout
    cy.get('button.btnLogout')
      .should('be.visible')
      .click()

    // url should be login
    cy.url().should('include', '/login')

    cy.get('h1')
      .should('have.class', 'display-2')
      .contains('Login')
  })
})
