import { setLocaleToEN } from '../support/utils'
import faker from 'faker'

describe('Login', () => {
  it('Visits the login url', () => {
    cy.visit('/login')
    setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Login')
  })
  it('Displays errors when user does not exist', () => {
    cy.get('input[name=email]')
      .clear()
      .type(faker.internet.email())
    cy.get('input[name=password]')
      .clear()
      .type('password123{enter}')

    cy.get('div.error')
      .should('be.visible')
      .and('contain', 'User does not exists')

    // and still be on the same URL
    cy.url().should('include', '/login')
  })
  it('Displays errors when password is wrong', () => {
    cy.get('input[name=email]')
      .clear()
      .type('admin@admin.com')
    cy.get('input[name=password]')
      .clear()
      .type('password123{enter}')

    cy.get('div.error')
      .should('be.visible')
      .and('contain', 'Wrong password')

    // and still be on the same URL
    cy.url().should('include', '/login')
  })
  it('Login', () => {
    cy.get('input[name=email]')
      .clear()
      .type('admin@admin.com')
    cy.get('input[name=password]')
      .clear()
      .type('12345{enter}')

    // url should be home
    cy.url().should('include', '/home')

    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Protected Home')
  })
  it('Logout', () => {
    cy.get('button.btnLogout')
      .should('be.visible')
      .click()

    // url should be login
    cy.url().should('include', '/login')

    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Login')
  })
  it('Go to forgot password', () => {
    cy.get('a.btnForgotPassword')
      .should('be.visible')
      .click()

    // url should be forgot
    cy.url().should('include', '/forgot')
  })
})
