import CommentModal from '../pages/CommentModal';

describe('Time tracking', () => {
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

  it.only('Should add, edit and remove the estimation', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      cy.get('input[placeholder="Number"]').click().clear().type(8);
    });
  });
});
