describe('Landing', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .contains('Landing')
  })
})
