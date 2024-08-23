import IssueModal from '../../pages/CommentModal';
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
});
