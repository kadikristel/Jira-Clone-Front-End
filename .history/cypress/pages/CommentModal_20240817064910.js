class CommentModal {
  constructor() {
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.issueComment = '[data-testid="issue-comment"]';
    this.addCommentArea = 'Add a comment...';
    this.closeDetailModalButton = '[data-testid="icon:close"]';
    this.confirmationPopup = '[data-testid="modal:confirm"]';
    this.deleteButtonName = 'Delete comment';
    this.cancelButtonName = 'Cancel';
    this.saveButtonName = 'Save';
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }

  clickAddCommentArea() {
    cy.contains('div', 'Add a comment...').scrollIntoView().click();
  }

  getCommentTextArea() {
    return cy.get(this.commentTextArea);
  }

  getIssueComment() {
    return cy.get(this.issueComment);
  }

  clickSaveButton() {
    cy.contains('button', this.saveButtonName).click();
  }

  createComment(commentText) {
    this.getIssueDetailsModal().within(() => {
      this.clickAddCommentArea();
      this.getCommentTextArea().type(commentText);
      this.getCommentTextArea().should('have.value', commentText);
      this.clickSaveButton();
      cy.contains(this.addCommentArea).should('exist');
      this.getIssueComment().should('contain', commentText);
    });
  }

  editComment(originalComment, editedComment) {
    this.getIssueComment().first().contains('Edit').click().should('not.exist');

    this.getCommentTextArea()
      .should('have.value', originalComment)
      .clear()
      .should('have.value', '')
      .type(editedComment);
    this.clickSaveButton();
    this.getIssueComment()
      .should('contain', 'Edit')
      .and('contain', editedComment);
  }

  deleteComment() {}

  deleteExistingComment() {
    this.getIssueComment().first().contains('Delete').click();

    cy.get(this.confirmationPopup)
      .should('be.visible')
      .within(() => {
        cy.contains('Are you sure you want to delete this comment?');
        cy.contains("Once you delete, it's gone for good.");
        cy.contains('button', this.deleteButtonName).click();
      });

    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.issueComment).should('not.exist');
  }

  deleteNewComment(commentText) {
    this.getIssueComment().first().contains('Delete').click();

    cy.get(this.confirmationPopup)
      .should('be.visible')
      .within(() => {
        cy.contains('Are you sure you want to delete this comment?');
        cy.contains("Once you delete, it's gone for good.");
        cy.contains('button', this.deleteButtonName).click();
      });

    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.issueComment).should('not.contain', commentText);
  }

  clickCancelButton() {
    cy.contains('button', this.cancelButtonName).click();
  }

  cancelDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.get('button')
        .contains(this.cancelButtonName)
        .should('be.visible')
        .click();
    });
    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.issueDetailsModal).should('be.visible');
  }

  validateCommentCreation(commentText) {
    cy.contains(this.addCommentArea).should('exist');
    this.getIssueComment().should('contain', commentText);
  }
}

export default new CommentModal();
