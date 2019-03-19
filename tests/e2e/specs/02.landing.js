describe('Landing', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    // url should be /
    cy.url().should('include', '/')
  })
})
