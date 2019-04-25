const BASE_URL = Cypress.config().baseUrl;

describe('Auth', () => {
  it('Username input contains default username and allows logging in with it', () => {
    cy.visit('/auth');
    cy.get('input#username').should('have.value', 'tickle122');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.url().should('equal', `${BASE_URL}/`);
  });
  it('Allows logging in with a non-default, but valid username', () => {
    cy.visit('/auth');
    cy.get('input#username').type('jessjelly');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.url().should('equal', `${BASE_URL}/`);
  });
});
