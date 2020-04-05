describe('Theme', () => {
  it('Load light theme initially', () => {
    cy.visit('/')
    cy.get('#app').should('have.css', 'background-color', 'rgb(255, 255, 255)')
  })
  it('Change to dark theme', () => {
    cy.visit('/')
    cy.get('[type="checkbox"]').check({ force: true })
    cy.get('#app').should('have.css', 'background-color', 'rgb(18, 18, 18)')
  })
  it('Retain dark theme on refresh', () => {
    cy.visit('/')
    cy.get('#app').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('[type="checkbox"]').check({ force: true })
    cy.visit('/')
    cy.get('#app').should('have.css', 'background-color', 'rgb(18, 18, 18)')
  })
})
