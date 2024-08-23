import CommentModal from '../pages/CommentModal';
import { faker } from '@faker-js/faker';

const commentData = {
  newComment: faker.lorem.sentences({
    min: 1,
    max: 5,
  }),

  previousComment: faker.lorem.sentences({
    min: 1,
    max: 6,
  }),
};

describe('Issue comments creating, editing and deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains(
          'Try dragging issues to different columns to transition their status.'
        ).click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  it.only('Should create a comment successfully', () => {
    const comment = 'TEST_COMMENT';

    getIssueDetailsModal().within(() => {
      cy.contains('Add a comment...').click();

      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      cy.contains('button', 'Save').click().should('not.exist');

      cy.contains('Add a comment...').should('exist');
      cy.get('[data-testid="issue-comment"]').should('contain', comment);
    });
  });

  it('Should edit a comment successfully', () => {
    const previousComment = 'An old silent pond...';
    const comment = 'TEST_COMMENT_EDITED';

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains('Edit')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Add a comment..."]')
        .should('contain', previousComment)
        .clear()
        .type(comment);

      cy.contains('button', 'Save').click().should('not.exist');

      cy.get('[data-testid="issue-comment"]')
        .should('contain', 'Edit')
        .and('contain', comment);
    });
  });

  it('Should delete a comment successfully', () => {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains('Delete')
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Delete comment')
      .click()
      .should('not.exist');

    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should('not.exist');
  });

  it('Should create a comment, edit created comment and delete a comment successfully', () => {});
});
