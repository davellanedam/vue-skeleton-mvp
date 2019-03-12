import { setLocaleToEN } from '../support/utils'

describe('About', () => {
  it('Visits about url', () => {
    cy.visit('/about')
    setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'About')
  })
})
