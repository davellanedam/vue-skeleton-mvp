// import faker from 'faker'

describe('Admin Cities', () => {
  it('Open admin cities', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // url should be admin/cities
    cy.url().should('include', '/admin/cities')

    cy.get('div.v-toolbar__title').and('contain', 'Cities')
  })
})
