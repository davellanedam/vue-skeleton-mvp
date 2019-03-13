// import faker from 'faker'

describe('Profile', () => {
  it('Visits the profile url', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/profile')
    cy.get('h1')
      .should('have.class', 'display-2')
      .contains('My profile')
  })
})
