describe('Admin Cities', () => {
  it('Visits the admin cities url and list cities', () => {
    cy.login('admin@admin.com')
    cy.visit('/admin/cities')
    // url should be /admin/cities
    cy.url().should('include', '/admin/cities')
  })
  it('Checks input types for create/edit new city', () => {
    cy.login('admin@admin.com')
    cy.visit('/admin/cities')

    // Click create new city
    cy.get('button.btnNewItem').contains('New Item').click()
    cy.get('div.dlgNewEditItem.v-dialog--active').should('be.visible')

    // Checks input type is text
    cy.get('input[name=name]').invoke('attr', 'type').should('contain', 'text')
  })
  it('Create new city', () => {
    cy.login('admin@admin.com')
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // Click create new city
    cy.get('button.btnNewItem').contains('New Item').click()
    cy.get('div.dlgNewEditItem.v-dialog--active').should('be.visible')

    // Type new city data and save
    cy.get('input[name=name]').clear().type('A New City')
    cy.get('button.btnSave').click()
    cy.get('div.success').should('be.visible').contains('Saved successfully')
  })
  it('Edit city', () => {
    cy.login('admin@admin.com')
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // Search city
    cy.get('#search').clear().type('A New City')
    cy.wait(1000)
    // Click and edit first element
    cy.get('button#edit').eq(0).click()
    cy.get('input[name=name]').clear().type('A New City Edited')
    cy.get('button.btnSave').click()
    cy.get('div.success').should('be.visible').contains('Saved successfully')
  })
  it('Search city', () => {
    cy.login('admin@admin.com')
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // Search edited city
    cy.get('#search').clear().type('A New City Edited')
    // Wait for api to reply
    cy.wait(1000)
    // Ensure there´s only one result
    cy.get('table > tbody > tr').should('have.length', 1)
    // Check if result is the same as entered in edit
    cy.get('table > tbody > tr > td').eq(1).contains('A New City Edited')
  })
  it('Delete city', () => {
    cy.login('admin@admin.com')
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // Search city
    cy.get('#search').clear().type('A New City Edited')
    // Wait for api to reply
    cy.wait(1000)
    // Ensure there´s only one result
    cy.get('table > tbody > tr').should('have.length', 1)
    // Check if result is the same as entered in edit
    cy.get('table > tbody > tr > td').eq(1).contains('A New City Edited')

    // Click and delete first element
    cy.get('button#delete').eq(0).click()
    cy.get('div.v-dialog.v-dialog--active').should('be.visible')
    cy.get('button > span.v-btn__content').contains('Delete').click()
    cy.get('div.success').should('be.visible').contains('Deleted successfully')
  })
})
