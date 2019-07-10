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
  it('Set locale to CN', () => {
    cy.visit('/')
    cy.setLocaleToCN()
    cy.get('h1').contains('首页')
  })
})
