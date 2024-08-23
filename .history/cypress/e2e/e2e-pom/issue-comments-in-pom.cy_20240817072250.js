import CommentModal from '../../pages/CommentModal';
import { faker } from '@faker-js/faker';

const commentData = {
  newComment: faker.lorem.sentences(faker.number.int({ min: 1, max: 2 })),
  editedComment: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
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
    CommentModal.createComment(commentData.newComment);
  });

  it('Should edit a comment successfully', () => {
    CommentModal.editComment(previousComment, commentData.editedComment);
  });

  it.only('Should delete a comment successfully', () => {
    CommentModal.deleteComment(previousComment, true);
  });

  it.only('Should create, edit and delete a comment', () => {
    const originalComment = commentData.newComment;
    const editedComment = commentData.editedComment;

    CommentModal.createComment(originalComment);
    CommentModal.editComment(originalComment, editedComment);
    CommentModal.deleteComment(editedComment, false);
  });
});
