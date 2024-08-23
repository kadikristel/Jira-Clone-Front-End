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
    return cy.get('textarea[placeholder="Add a comment..."]');
  }

  getIssueComment() {
    return cy.get('[data-testid="issue-comment"]');
  }

  typeComment(comment) {
    if (typeof comment === 'string') {
      cy.get(this.commentTextArea).type(comment);
    } else {
      console.error('Comment is not a string:', comment);
    }
  }

  createComment(commentDetails) {
    this.getIssueDetailsModal().within(() => {
      this.clickAddCommentArea();
      this.typeComment(commentDetails.comment);
      this.clickSaveButton();
    });
  }

  editComment(commentSelector, newComment) {
    cy.get(commentSelector).within(() => {
      cy.contains('Edit').click();
      cy.get(this.commentTextArea).clear().type(newComment);
      cy.contains('button', this.saveButtonName).click();
    });
  }

  deleteComment() {
    this.getIssueDetailsModal()
      .find(this.issueComment)
      .contains('Delete')
      .click();

    cy.get(this.confirmationPopup)
      .should('be.visible')
      .within(() => {
        cy.contains(this.deleteButtonName).click();
      });

    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.issueComment).should('not.exist');
  }

  clickSaveButton() {
    cy.contains('button', 'Save').click();
  }

  clickCancelButton() {
    cy.contains('button', 'Cancel').click();
  }

  clickDeleteButton() {
    cy.contains('button', 'Delete').click();
    cy.get(this.confirmationPopup)
      .should('be.visible')
      .and('contain', 'Are you sure you want to delete this comment?')
      .and('contain', "Once you delete, it's gone for good.");
  }

  confirmDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.contains(this.deleteButtonName).click();
    });
    cy.get(this.confirmationPopup).should('not.exist');
  }

  cancelDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.get('button').contains('Cancel').should('be.visible').click();
    });
    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.issueDetailsModal).should('be.visible');
  }

  closeDetailModal() {
    cy.get(this.issueDetailsModal)
      .get(this.closeDetailModalButton)
      .first()
      .click();
    cy.get(this.issueDetailsModal).should('not.exist');
  }
}

export default new CommentModal();
