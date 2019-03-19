describe('Auth routes', () => {
  it('Forbids visits to home url if not authenticated', () => {
    cy.visit('/')
    cy.visit('/home')
    // url should be /login
    cy.url().should('include', '/login')
  })
  it('Forbids visits to profile url if not authenticated', () => {
    cy.visit('/')
    cy.visit('/profile')
    // url should be /login
    cy.url().should('include', '/login')
  })
  it('Forbids visits to admin cities url if not authenticated', () => {
    cy.visit('/')
    cy.visit('/admin/cities')
    // url should be /login
    cy.url().should('include', '/login')
  })
  it('Forbids visits to admin users url if not authenticated', () => {
    cy.visit('/')
    cy.visit('/admin/users')
    // url should be /login
    cy.url().should('include', '/login')
  })
})
