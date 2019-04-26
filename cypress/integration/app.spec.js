const BASE_URL = Cypress.config().baseUrl;

describe('Auth', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.stub();
    cy.visit('/auth');
  });
  it('Username input contains default username and allows logging in with it', () => {
    cy.get('input#username').should('have.value', 'tickle122');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.url().should('equal', `${BASE_URL}/`);
  });
  it('Allows logging in with a non-default, but valid username', () => {
    cy.get('input#username').type('jessjelly');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.url().should('equal', `${BASE_URL}/`);
  });
  it('Clears default when input box is selected, but default returns when blurred', () => {
    cy.get('input#username')
      .focus()
      .should('have.value', '')
      .blur()
      .should('have.value', 'tickle122');
  });
  it('Takes user to the previous page they were on after login', () => {
    cy.visit('/articles/10');
    cy.get('[data-cy=login-link]').click();
    cy.get('button')
      .contains('Log in')
      .click();
    cy.url().should('equal', `${BASE_URL}/articles/10`);
  });
  it('Fails login with invalid username and displays notification', () => {
    cy.get('input#username').type('invalid');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('input#username').should('have.class', 'login-fail');
    cy.get('p#login-fail-warning').should('exist');
  });
});
