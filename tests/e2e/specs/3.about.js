describe('About', () => {
  it('Visits about url', () => {
    cy.visit('/about')
    cy.setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .contains('About')
  })
})
