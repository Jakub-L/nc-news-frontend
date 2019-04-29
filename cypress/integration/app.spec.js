const BASE_URL = Cypress.config().baseUrl;
describe('Home', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.stub();
    cy.visit('/');
  });
  it('Loads articles into a list, sorted by created_at by default', () => {
    cy.get('.ArticleCard').should('have.length', 10);
    cy.get('.ArticleCard > .article-time')
      .first()
      .invoke('text')
      .should('equal', 'Posted on 2018-05-30 at 15:59');
    cy.get('.ArticleCard > .article-time')
      .last()
      .invoke('text')
      .should('equal', 'Posted on 2017-11-05 at 07:22');
  });
  it('Allows sorting by different categories', () => {
    cy.get('.sort-dropdown').select('comment_count');
    cy.get('.ArticleCard > .article-title')
      .first()
      .invoke('text')
      .should('equal', 'History of FC Barcelona');
    cy.get('.ArticleCard > .article-title')
      .last()
      .invoke('text')
      .should('equal', 'HOW COOKING HAS CHANGED US');
    cy.get('.sort-dropdown').select('votes');
    cy.get('.ArticleCard > .article-title')
      .first()
      .invoke('text')
      .should('equal', 'Seafood substitutions are increasing');
    cy.get('.ArticleCard > .article-title')
      .last()
      .invoke('text')
      .should(
        'equal',
        'Why do England managers keep making the same mistakes?'
      );
  });
  it('Allows sorting ascending/descending', () => {
    cy.get('.sort-dropdown').select('votes');
    cy.get('.sort-button').click();
    cy.get('.ArticleCard > .article-title')
      .first()
      .invoke('text')
      .should('equal', 'High Altitude Cooking');
    cy.get('.ArticleCard > .article-title')
      .last()
      .invoke('text')
      .should(
        'equal',
        'Why do England managers keep making the same mistakes?'
      );
  });
});

describe.only('Topics', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.stub();
  });
  it('Lists correct number of topics in navigation bar', () => {
    cy.visit('/');
    cy.get('.dropdown-list-link').should('have.length', 3);
  });
  it('Displays articles on particle topics', () => {
    cy.visit('/topics/football');
    cy.get('.ArticleCard > .article-title')
      .first()
      .invoke('text')
      .should(
        'equal',
        "What does Jose Mourinho's handwriting say about his personality?"
      );
    cy.get('.ArticleCard > .article-title')
      .last()
      .invoke('text')
      .should('equal', 'Agility Training Drills For Football Players');
  });
  it('Allows navigating to topics from links in navbar', () => {
    cy.visit('/');
    cy.get('.dropdown-list-link')
      .contains('football')
      .click({ force: true });
    cy.url().should('equal', `${BASE_URL}/topics/football`);
  });
});

describe('Auth', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.stub();
    cy.visit('/login');
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
    cy.visit('/articles/33');
    cy.get('[data-cy=login-link]').click();
    cy.get('button')
      .contains('Log in')
      .click();
    cy.url().should('equal', `${BASE_URL}/articles/33`);
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
