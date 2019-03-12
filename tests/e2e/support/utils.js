export const setLocaleToEN = () => {
  cy.get('button.btnLocaleActivation')
    .should('be.visible')
    .click()
  cy.get('div.btnEN')
    .should('be.visible')
    .click()
}

export const setLocaleToES = () => {
  cy.get('button.btnLocaleActivation')
    .should('be.visible')
    .click()
  cy.get('div.btnES')
    .should('be.visible')
    .click()
}
