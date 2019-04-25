describe('Auth', () => {
  it('Username input contains default username and allows logging in with it', () => {
    cy.visit('localhost:3000/auth');
    cy.get('input#username').should('have.value', 'tickle122');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
  it('Allows logging in with a non-default, but valid username', () => {
    cy.visit('localhost:3000/auth');
    cy.get('input#username').type('jessjelly');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
});
