import faker from 'faker'

describe('Profile', () => {
  it('Visits the profile url', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/profile')
    cy.get('h1')
      .should('have.class', 'display-2')
      .contains('My profile')
    cy.get('input[name=email]').should('have.value', 'admin@admin.com')
  })
  it('Edits profile', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/profile')

    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    const phone = faker.phone.phoneNumber()
    const country = faker.random.word()
    const urlTwitter = faker.internet.url()
    const urlGitHub = faker.internet.url()
    // name
    cy.get('input[name=name]')
      .clear()
      .type(name)
    // phone
    cy.get('input[name=phone]')
      .clear()
      .type(phone)
    // city
    cy.get('i')
      .contains('clear')
      .click()
    cy.get('i')
      .contains('arrow_drop_down')
      .click()
    cy.get('div.v-list__tile__title')
      .contains('Cali')
      .click()
    cy.get('i')
      .contains('clear')
      .click()
    cy.get('i')
      .contains('arrow_drop_down')
      .click()
    cy.get('div.v-list__tile__title')
      .contains('Bucaramanga')
      .click()
    // country
    cy.get('input[name=country]')
      .clear()
      .type(country)
    // Twitter
    cy.get('input[name=urlTwitter]')
      .clear()
      .type(urlTwitter)
    // GitHub
    cy.get('input[name=urlGitHub]')
      .clear()
      .type(urlGitHub)
    // Save button
    cy.get('button.btnSave').click()
    cy.get('div.success')
      .should('be.visible')
      .contains('Profile saved successfuly')
    // Confirm values
    cy.get('input[name=name]').should('have.value', name)
    cy.get('input[name=phone]').should('have.value', phone)
    cy.get('input[name=city]').should('have.value', 'Bucaramanga')
    cy.get('input[name=country]').should('have.value', country)
    cy.get('input[name=urlTwitter]').should('have.value', urlTwitter)
    cy.get('input[name=urlGitHub]').should('have.value', urlGitHub)
  })
})
