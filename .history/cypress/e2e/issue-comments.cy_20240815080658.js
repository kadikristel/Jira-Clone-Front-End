import CommentModal from '../pages/CommentModal';
import { faker } from '@faker-js/faker';

const commentData = {
  newComment: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  editedComment: faker.lorem.sentences(faker.number.int({ min: 1, max: 2 })),
};

const previousComment =
  'In the twilight rain\nthese brilliant-hued hibiscus -\nA lovely sunset.';

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

  it('Should cancel comment creation and validate cancellation successfully', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      CommentModal.clickAddCommentArea();
      cy.get(CommentModal.commentTextArea).type(commentData.newComment);
      cy.get(CommentModal.commentTextArea).should(
        'have.text',
        commentData.newComment
      );
      CommentModal.clickCancelButton();
      cy.contains(CommentModal.addCommentArea).should('exist');
      cy.get(CommentModal.issueComment).should(
        'not.contain',
        commentData.newComment
      );
    });
  });

  it('Should edit a comment successfully', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      cy.get(CommentModal.issueComment)
        .first()
        .contains('Edit')
        .click()
        .should('not.exist');
      cy.get(CommentModal.commentTextArea)
        .should('have.value', previousComment)
        .clear()
        .type(commentData.newComment);
      cy.contains('button', CommentModal.saveButtonName)
        .click()
        .should('not.exist');
      cy.get(CommentModal.issueComment)
        .should('contain', 'Edit')
        .and('contain', commentData.newComment);
    });
  });

  it('Should cancel comment edition and validate cancellation successfully', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      cy.get(CommentModal.issueComment)
        .first()
        .contains('Edit')
        .click()
        .should('not.exist');
      cy.get(CommentModal.commentTextArea)
        .should('have.value', previousComment)
        .clear()
        .type(commentData.newComment);
      CommentModal.clickCancelButton();
      cy.get(CommentModal.issueComment)
        .should('contain', 'Edit')
        .and('not.contain', commentData.newComment);
    });
  });

  it.only('Should delete a comment successfully', () => {
    CommentModal.getIssueDetailsModal()
      .find(CommentModal.issueComment)
      .contains('Delete')
      .click();
    cy.get(CommentModal.confirmationPopup)
      .should('be.visible')
      .within(() => {
        cy.contains('Are you sure you want to delete this comment?');
        cy.contains("Once you delete, it's gone for good.");
        cy.contains('button', CommentModal.deleteButtonName).click();
      });
    cy.get(CommentModal.confirmationPopup).should('not.exist');
    cy.get(CommentModal.issueComment).should(
      'not.contain',
      commentData.newComment
    );
  });

  it('Should cancel comment deletion and validate cancellation successfully', () => {
    CommentModal.getIssueDetailsModal()
      .find(CommentModal.issueComment)
      .contains('Delete')
      .click();
    cy.get(CommentModal.confirmationPopup)
      .should('be.visible')
      .within(() => {
        cy.contains('Are you sure you want to delete this comment?');
        cy.contains("Once you delete, it's gone for good.");
        cy.contains('button', CommentModal.cancelButtonName).click();
      });
    cy.get(CommentModal.confirmationPopup).should('not.exist');
    cy.get(CommentModal.issueComment)
      .should('exist')
      .and('contain', previousComment);
  });

  it('Should create a comment, edit created comment and delete a comment successfully', () => {
    CommentModal.getIssueDetailsModal().within(() => {
      CommentModal.clickAddCommentArea();
      cy.get(CommentModal.commentTextArea).type(commentData.newComment);
      cy.get(CommentModal.commentTextArea).should(
        'have.value',
        commentData.newComment
      );
      CommentModal.clickSaveButton();
      cy.contains(CommentModal.addCommentArea).should('exist');
      cy.get(CommentModal.issueComment).should(
        'contain',
        commentData.newComment
      );

      cy.get(CommentModal.issueComment)
        .first()
        .contains('Edit')
        .click()
        .should('not.exist');
      cy.get(CommentModal.commentTextArea)
        .should('have.value', commentData.newComment)
        .clear()
        .should('have.value', '')
        .type(commentData.editedComment);
      cy.contains('button', CommentModal.saveButtonName)
        .click()
        .should('not.exist');
      cy.get(CommentModal.issueComment)
        .should('contain', 'Edit')
        .and('contain', commentData.editedComment);

      cy.get(CommentModal.issueComment)
        .first()
        .contains('Delete')
        .click({ force: true })
        .then(() => {
          console.log('Delete button clicked');
        });

      cy.document().then((doc) => {
        const confirmationPopup = doc.querySelector(
          '[data-testid="modal:confirm"]'
        );
        if (confirmationPopup) {
          console.log('Confirmation popup found in DOM:', confirmationPopup);
          cy.wrap(confirmationPopup).should('be.visible');
        } else {
          console.error('Confirmation popup not found in DOM');
        }
      });

      cy.get(CommentModal.confirmationPopup, { timeout: 60000 })
        .should('be.visible')
        .within(() => {
          cy.contains('Are you sure you want to delete this comment?');
          cy.contains("Once you delete, it's gone for good.");
          cy.contains('button', CommentModal.deleteButtonName).click();
        });
      cy.get(CommentModal.confirmationPopup).should('not.exist');
      cy.get(CommentModal.issueComment).should(
        'not.contain',
        commentData.editedComment
      );
    });
  });

  it('Should create a comment, edit cancellation and delete a comment successfully', () => {});

  it(
    'Should create a comment, edit created comment and cancel deletion successfully'
  );
});
