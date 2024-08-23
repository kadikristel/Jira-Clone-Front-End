import CommentModal from '../pages/CommentModal';
import { faker } from '@faker-js/faker';

const commentData = {
  newComment: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  previousComment: faker.lorem.sentences(faker.number.int({ min: 1, max: 5 })),
};

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

  it('Should create a comment successfully', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      CommentModal.clickAddCommentArea();
      cy.get(CommentModal.commentTextArea).type(commentData.newComment);
      cy.get(CommentModal.commentTextArea).should(
        'have.text',
        commentData.newComment
      );
      CommentModal.clickSaveButton();
      cy.contains(CommentModal.addCommentArea).should('exist');
      cy.get(CommentModal.issueComment).should(
        'contain',
        commentData.newComment
      );
    });
  });

  const previousComment =
    'In the twilight rain these brilliant-hued hibiscus - A lovely sunset.';

  it.only('Should edit a comment successfully', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      cy.get(CommentModal.issueComment)
        .first()
        .contains('Edit')
        .click()
        .should('not.exist');

      cy.get(CommentModal.addCommentArea)
        .should('contain', previousComment)
        .clear()
        .type(commentData.newComment);
      CommentModal.clickSaveButton().should('not.exist');
      cy.get(CommentModal.issueComment)
        .should('contain', 'Edit')
        .and('contain', commentData.newComment);
    });
  });

  it('Should delete a comment successfully', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      CommentModal.clickCloseButtonToCloseDetailModal();

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
});
