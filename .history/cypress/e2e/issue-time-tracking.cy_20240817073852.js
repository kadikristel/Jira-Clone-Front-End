import CommentModal from '../pages/CommentModal';

describe('Issue comments creating, editing and deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains(
          'Try dragging issues to different columns to transition their status.'
        ).click();
      });
  });

  it.only();
});
