import { setLocaleToEN, setLocaleToES } from '../support/utils'

describe('Locale', () => {
  it('Set locale to ES', () => {
    cy.visit('/')
    setLocaleToES()
    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Página de aterrizaje')
  })
  it('Set locale to EN', () => {
    cy.visit('/')
    setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Landing')
  })
})
