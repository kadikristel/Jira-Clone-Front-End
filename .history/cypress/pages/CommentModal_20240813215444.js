class CommentModal {
  constructor() {
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.issueComment = '[data-testid="issue-comment"]';
    this.addCommentArea = 'Add a comment...';
    this.closeDetailModalButton = '[data-testid="icon:close"]';
    this.confirmationPopup = '[data-testid="modal:confirm"]';
    this.deleteButtonName = 'Delete';
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }

  clickAddCommentArea() {
    cy.contains('div', 'Add a comment...')
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  typeComment(comment) {
    cy.get(this.commentTextArea).type(comment);
  }

  editComment(newComment) {
    cy.contains('div', 'Edit').type(newComment);
  }

  clickSaveButton() {
    cy.contains('button', 'Save').click();
  }

  clickCancelButton() {
    cy.contains('button', 'Cancel').click();
  }

  clickDeleteButton() {
    cy.contains('button', 'Delete').click();
  }

  confirmDeletion() {}

  clickCloseButtonToCloseDetailModal() {
    cy.get(this.closeIcon).closest('button').click();
  }

  createComment(commentDetails) {
    this.getIssueDetailsModal().within(() => {
      this.clickAddCommentArea();
      this.typeComment(commentDetails.comment);
      this.clickSaveButton();
    });
  }
}

export default new CommentModal();
