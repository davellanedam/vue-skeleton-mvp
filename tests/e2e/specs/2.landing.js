import { setLocaleToEN } from '../support/utils'

describe('Landing', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Landing')
  })
})
