Cypress.Commands.add('clearSessionStorage', () => {
  cy.window().then(win => win.sessionStorage.clear());
});

Cypress.Commands.add('stub', () => {
  cy.server();
  cy.route('*/topics', 'fx:topics.json');
  // User routes
  cy.route('*/users/tickle122', 'fx:users-tickle122.json');
  cy.route('*/users/jessjelly', 'fx:users-jessjelly.json');
  cy.route({
    url: '*/users/invalid',
    status: 404,
    response: 'fx:users-invalid.json',
  });
  // Article lists routes
  cy.route(
    '*/articles?sort_by=created_at&order=desc',
    'fx:articles-all-createdat-desc.json'
  );
  cy.route(
    '*/articles?sort_by=created_at&order=desc&p=2',
    'fx:articles-all-page2.json'
  );
  cy.route(
    '*/articles?sort_by=comment_count&order=desc',
    'fx:articles-all-commentcount-desc.json'
  );
  cy.route(
    '*/articles?sort_by=votes&order=desc',
    'fx:articles-all-votes-desc.json'
  );
  cy.route(
    '*/articles?sort_by=votes&order=asc',
    'fx:articles-all-votes-asc.json'
  );
  cy.route(
    '*/articles?sort_by=created_at&order=desc&topic=football',
    'fx:articles-football-createdat-desc.json'
  );
  cy.route(
    '*/articles?sort_by=created_at&order=desc&topic=invalid',
    'fx:articles-invalid.json'
  );

  // Individual article routes
  cy.route('*/articles/33', 'fx:article-33-article.json');
  cy.route('*/articles/33/comments', 'fx:article-33-comments.json');
  cy.route('*/articles/99999', 'fx:article-invalid-article.json');
  cy.route('*/articles/99999/comments', 'fx:article-invalid-comments.json');
  cy.route('*/articles/16', 'fx:article-16-article.json');
  cy.route('*/articles/16/comments', 'fx:article-16-comments-page1.json');
  cy.route('*/articles/16/comments?p=2', 'fx:article-16-comments-page2.json');
  cy.route('POST', '*/articles/33/comments', 'fx:article-33-post-comment.json');
  cy.route('DELETE', '*/comments/200', {});

  // Voting on article
  cy.route('PATCH', '*/articles/33', 'fx:article-33-article.json');

  // Voting on comments
  cy.route('PATCH', '*/comments/301', 'fx:article-33-vote-comment.json');
});
