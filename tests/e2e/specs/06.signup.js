import faker from 'faker'
const email = faker.internet.email()

describe('Signup', () => {
  it('Visits the signup url', () => {
    cy.visit('/signup')
    // url should be /signup
    cy.url().should('include', '/signup')
  })
  it('Checks input types', () => {
    cy.visit('/signup')
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
    cy.visit('/signup')
    cy.setLocaleToEN()
    cy.get('input[name=name]').clear().type('Another User')
    cy.get('input[name=email]').clear().type('admin@admin.com')
    cy.get('input[name=password]').clear().type('12345')
    cy.get('input[name=confirmPassword]').clear().type('12345{enter}')

    cy.get('div.error').should('be.visible').contains('E-mail already exists')
    // and still be on the same URL
    cy.url().should('include', '/signup')
  })
  it('Signup', () => {
    cy.visit('/signup')
    cy.setLocaleToEN()
    cy.get('input[name=name]').clear().type('Another User')
    cy.get('input[name=email]').clear().type(email)
    cy.get('input[name=password]').clear().type('12345')
    cy.get('input[name=confirmPassword]').clear().type('12345{enter}')

    // url should be home
    cy.url().should('include', '/home')

    // Accept to verify account
    cy.get('div.dlgVerifyAccount').and(
      'contain',
      'IMPORTANT: Verify your account'
    )

    // Close dialog
    cy.get('button.btnClose').should('be.visible').click()

    // Logout
    cy.logout()
  })
  it('Verify account', () => {
    cy.visit('/login')
    cy.setLocaleToEN()
    cy.login(email)

    // url should be home
    cy.url().should('include', '/home')

    // Accept to verify account
    cy.get('div.dlgVerifyAccount').and(
      'contain',
      'IMPORTANT: Verify your account'
    )

    // Close dialog
    cy.get('button.btnClose').should('be.visible').click()

    // This does not run when executing Travis CI
    if (Cypress.env('ENV') !== 'ci') {
      // get verification and visit verification url
      let verification = ''
      cy.window().then((window) => {
        const user = JSON.parse(window.localStorage.getItem('user'))
        verification = user.verification

        cy.visit(`/verify/${verification}`)
        // url should be verify
        cy.url().should('include', `/verify/${verification}`)

        cy.get('div.success')
          .should('be.visible')
          .contains('E-mail verified successfully')

        // Logout
        cy.logout()
      })
    }
  })
  it('Displays errors when account is already verified', () => {
    cy.visit('/login')
    cy.setLocaleToEN()
    cy.login(email)

    // url should be home
    cy.url().should('include', '/home')

    // get verification and visit verification url
    let verification = ''
    cy.window().then((window) => {
      const user = JSON.parse(window.localStorage.getItem('user'))
      verification = user.verification

      cy.visit(`/verify/${verification}`)
      // url should be verify
      cy.url().should('include', `/verify/${verification}`)

      cy.get('div.error')
        .should('be.visible')
        .contains('Not found or already verified')

      // Logout
      cy.logout()
    })
  })
})
