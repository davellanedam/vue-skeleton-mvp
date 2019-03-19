describe('Locale', () => {
  it('Set locale to ES', () => {
    cy.visit('/')
    cy.setLocaleToES()
    cy.get('h1').contains('Página de aterrizaje')
  })
  it('Set locale to EN', () => {
    cy.visit('/')
    cy.setLocaleToEN()
    cy.get('h1').contains('Landing')
  })
})
