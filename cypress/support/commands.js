Cypress.Commands.add('clearSessionStorage', () => {
  cy.window().then(win => win.sessionStorage.clear());
});

Cypress.Commands.add('stub', () => {
  cy.server();
  cy.route('*/topics', 'fx:topics.json');
  cy.route('*/users/tickle122', 'fx:users-tickle122.json');
  cy.route('*/users/jessjelly', 'fx:users-jessjelly.json');
  cy.route({
    url: '*/users/invalid',
    status: 404,
    response: 'fx:users-invalid.json',
  });
});
