import faker from 'faker'
let verification = ''

describe('Forgot Password / Reset Password', () => {
  it('Visits the forgot password url', () => {
    cy.visit('/forgot')
    // url should be /forgot
    cy.url().should('include', '/forgot')
  })
  it('Checks input types', () => {
    cy.visit('/forgot')
    // Checks input type is email
    cy.get('input[name=email]')
      .invoke('attr', 'type')
      .should('contain', 'email')
  })
  it('Displays errors when user does not exist', () => {
    cy.visit('/forgot')
    cy.setLocaleToEN()
    cy.get('input[name=email]')
      .clear()
      .type(`${faker.internet.email()}{enter}`)

    cy.get('div.error')
      .should('be.visible')
      .contains('User does not exists')
    // and still be on the same URL
    cy.url().should('include', '/forgot')
  })
  it('Forgot password', () => {
    cy.visit('/forgot')
    cy.setLocaleToEN()
    cy.get('input[name=email]')
      .clear()
      .type('admin@admin.com{enter}')

    cy.get('div.success')
      .should('be.visible')
      .and(
        'contain',
        'We have sent a message to admin@admin.com with instructions to recover your password'
      )
  })
  it('Checks input types reset password', () => {
    cy.visit('/reset/12345')
    cy.setLocaleToEN()
    // Checks input type is password
    cy.get('input[name=password]')
      .invoke('attr', 'type')
      .should('contain', 'password')
    cy.get('input[name=confirmPassword]')
      .invoke('attr', 'type')
      .should('contain', 'password')
  })
  it('Reset password', () => {
    cy.visit('/forgot')
    cy.setLocaleToEN()

    // This does not run when executing Travis CI
    if (Cypress.env('ENV') !== 'ci') {
      cy.server()

      // This is the post call we are interested in capturing
      cy.route('POST', `${Cypress.env('API_URL')}/forgot`).as('forgot')
      cy.visit('/forgot')
      cy.get('input[name=email]')
        .clear()
        .type('admin@admin.com{enter}')

      cy.wait('@forgot')

      // Assert on XHR
      cy.get('@forgot').then(xhr => {
        expect(xhr.status).to.eq(200)
        expect(xhr.responseBody).to.have.property('verification')
        verification = xhr.responseBody.verification

        // Go to reset password
        cy.visit(`/reset/${verification}`)
        // url should be verify
        cy.url().should('include', `/reset/${verification}`)

        cy.get('input[name=password]')
          .clear()
          .type('12345')
        cy.get('input[name=confirmPassword]')
          .clear()
          .type('12345{enter}')

        cy.get('div.success')
          .should('be.visible')
          .and('contain', 'Password changed successfully')
      })
    }
  })
})
