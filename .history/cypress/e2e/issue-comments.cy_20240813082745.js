import CommentModal from '../pages/CommentModal';
import { faker } from '@faker-js/faker';

const commentData = {
  newComment: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 5 })),
  previousComment: faker.lorem.sentences(
    faker.datatype.number({ min: 1, max: 6 })
  ),
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

  it.only('Should delete a comment successfully', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      CommentModal.clickCloseButton();

      

    it('Should create a comment, edit created comment and delete a comment successfully', () => {});
  });
});
