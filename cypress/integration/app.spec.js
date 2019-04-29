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

describe('Topics', () => {
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
    cy.location('pathname').should('eq', '/topics/football');
  });
  it('Redirects to error page when visiting non-existent topic', () => {
    cy.visit('/topics/invalid');
    cy.location('pathname').should('eq', '/error/404');
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
    cy.location('pathname').should('eq', '/');
  });
  it('Allows logging in with a non-default, but valid username', () => {
    cy.get('input#username').type('jessjelly');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.location('pathname').should('eq', '/');
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
    cy.location('pathname').should('eq', '/articles/33');
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

describe('Single Article', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.stub();
  });
  it('Clicking through the article link takes user to article', () => {
    cy.visit('/');
    cy.get('.ArticleCard > .article-title')
      .contains('Seafood substitutions are increasing')
      .click();
    cy.location('pathname').should('eq', '/articles/33');
  });
  it('Loads comments', () => {
    cy.visit('/articles/33');
    cy.get('.CommentCard').should('have.length', 7);
  });
  it('Displays comment submit box when logged in', () => {
    cy.visit('/login');
    cy.get('button')
      .contains('Log in!')
      .click();
    cy.visit('/articles/33');
    cy.get('.CommentSubmit').should('be.visible');
  });
  it('Allows posting a comment and optimistically displays it', () => {
    cy.visit('/login');
    cy.get('button')
      .contains('Log in!')
      .click();
    cy.visit('/articles/33');
    cy.get('.CommentSubmit > textarea').type(
      'Successful Cypress comment test.'
    );
    cy.get('.CommentSubmit > button').click();
    cy.get('.CommentCard').should('have.length', 8);
    cy.get('.CommentCard > .comment-body')
      .first()
      .contains('Successful Cypress comment test.');
  });
  it('Allows deleting a comment posted by the user', () => {
    cy.visit('/login');
    cy.get('button')
      .contains('Log in!')
      .click();
    cy.visit('/articles/33');
    cy.get('.CommentSubmit > textarea').type(
      'Successful Cypress comment test.'
    );
    cy.get('.CommentSubmit > button').click();
    cy.get('.CommentCard').should('have.length', 8);
    cy.get('.CommentCard')
      .first()
      .within(() => {
        cy.get('.comment-delete-button').click();
      });
    cy.get('.CommentCard').should('have.length', 7);
  });
  it('Takes user to 404 page when given non-existent article', () => {
    cy.visit('/articles/99999');
    cy.location('pathname').should('eq', '/error/404');
  });
});

describe('Voting', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.stub();
  });
  it('Voting is disabled when not logged in', () => {
    cy.visit('/');
    cy.get('.Voter > button').should('be.disabled');
  });
  it('Can vote when logged in', () => {
    cy.visit('/login');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('.Voter > button').should('be.enabled');
    cy.get('.Voter')
      .first()
      .within(() => {
        cy.get('#up-vote').click();
        cy.get('#votes')
          .invoke('text')
          .should('equal', '8');
      });
    cy.get('.Voter')
      .eq(1)
      .within(() => {
        cy.get('#down-vote').click();
        cy.get('#votes')
          .invoke('text')
          .should('equal', '-2');
      });
  });
  it('Cannot vote more than once on a single article', () => {
    cy.visit('/login');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('.Voter')
      .first()
      .within(() => {
        cy.get('#up-vote').click();
        cy.get('#up-vote').should('be.disabled');
      });
  });
  it('Returns to 0 if voting up after voting down (and vice versa)', () => {
    cy.visit('/login');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('.Voter')
      .first()
      .within(() => {
        cy.get('#up-vote').click();
        cy.get('#down-vote').click();
        cy.get('#votes')
          .invoke('text')
          .should('equal', '7');
        cy.get('#down-vote').click();
        cy.get('#up-vote').click();
        cy.get('#votes')
          .invoke('text')
          .should('equal', '7');
      });
  });
  it('Can vote on comments', () => {
    cy.visit('/login');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.visit('/articles/33');
    cy.get('.comment-votes')
      .first()
      .within(() => {
        cy.get('#up-vote').click();
        cy.get('#up-vote').should('be.disabled');
        cy.get('#votes')
          .invoke('text')
          .should('equal', '-3');
      });
  });
});

describe('Pagination', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.stub();
  });
  it('Correctly displays the number of pages', () => {
    cy.visit('/');
    cy.get('.PageScroller button').should('have.length', 3);
  });
  it('Allows page navigation on list of articles', () => {
    cy.visit('/');
    cy.get('.PageScroller #2').click();
    cy.get('.ArticleCard > .article-title')
      .first()
      .invoke('text')
      .should('equal', 'History of Football');
    cy.get('.ArticleCard > .article-title')
      .last()
      .invoke('text')
      .should('equal', 'HOW COOKING HAS CHANGED US');
  });
  it('Allows page navigation on list of comments', () => {
    cy.visit('/articles/16');
    cy.get('.PageScroller #2').click();
    cy.get('.CommentCard').should('have.length', 6);
    cy.get('.CommentCard > .comment-body')
      .first()
      .invoke('text')
      .should('include', 'Quia numquam ut fuga');
    cy.get('.CommentCard > .comment-body')
      .last()
      .invoke('text')
      .should('include', 'Aut sint ut');
  });
});

describe('User Pages', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.stub();
  });
  it('Displays correct user', () => {
    cy.visit('/users/jessjelly');
    cy.get('.ArticleCard').should('have.length', 7);
    cy.get('#user-username')
      .invoke('text')
      .should('equal', 'jessjelly');
  });
  it('Allows navigation from clicked links', () => {
    cy.visit('/');
    cy.get('.author-link')
      .contains('jessjelly')
      .first()
      .click();
    cy.get('.ArticleCard').should('have.length', 7);
    cy.get('#user-username')
      .invoke('text')
      .should('equal', 'jessjelly');
  });
  it('Redirects to 404 when invalid user is asked for', () => {
    cy.visit('/users/invalid');
    cy.location('pathname').should('eq', '/error/404');
  });
});
