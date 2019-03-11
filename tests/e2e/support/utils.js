export const setLocaleToEN = () => {
  cy.get('button.localeActivationButton')
    .should('be.visible')
    .click()
  cy.get('div.localeOption')
    .should('be.visible')
    .and('contain', 'EN')
    .and('contain', 'ES')
    .eq(0)
    .click()
}
