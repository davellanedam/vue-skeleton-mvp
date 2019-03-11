export const setLocaleToEN = () => {
  cy.get('button.btnLocaleActivation')
    .should('be.visible')
    .click()
  cy.get('div.localeOption')
    .should('be.visible')
    .and('contain', 'EN')
    .and('contain', 'ES')
    .eq(0)
    .click()
}
