import CommentModal from '../../pages/CommentModal';
import { faker } from '@faker-js/faker';

const commentData = {
  newComment: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  editedComment: faker.lorem.sentences(faker.number.int({ min: 1, max: 5 })),
};

const previousComment =
  'In the twilight rain\nthese brilliant-hued hibiscus -\nA lovely sunset.';

describe('Issue comments creating, editing and deleting using POM approach', () => {
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
    CommentModal.createComment({
      comment: commentData.newComment,
    });
  });

  it('Should edit a comment successfully', () => {
    CommentModal.editComment({
      previousComment: previousComment,
      editedComment: commentData.editedComment,
    });
  });

  it('Should delete a comment successfully', () => {
    CommentModal.deleteComment(previousComment);
  });

  it.only('Should create, edit and delete a comment', () => {
    CommentModal.createComment({
      comment: commentData.newComment,
    });
    CommentModal.editComment({
      previousComment: commentData.newComment,
      editedComment: commentData.editedComment,
    });
    CommentModal.deleteComment(previousComment);
  });
});
