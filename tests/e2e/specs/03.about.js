describe('About', () => {
  it('Visits about url', () => {
    cy.visit('/about')
    // url should be /about
    cy.url().should('include', '/about')
  })
})
