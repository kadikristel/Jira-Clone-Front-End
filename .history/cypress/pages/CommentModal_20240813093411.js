class CommentModal {
  constructor() {
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.issueComment = '[data-testid="issue-comment"]';
    this.addCommentArea = 'Add a comment...';
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }

  createComment(commentDetails) {
    this.getIssueDetailsModal().within(() => {
      cy.get(this.clickAddCommentArea).click();
      this.comment(commentDetails.comment);
      this.clickSaveButton();
    });
  }

  clickAddCommentArea() {
    cy.contains('div', 'Add a comment...')
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  typeComment() {
    cy.get(this.commentTextArea).type(comment);
  }

  clickSaveButton() {
    cy.get('.sc-iuJeZd.kJzFof > button:first-child')
      .find('div')
      .contains('Save')
      .click();
  }

  clickCloseButtonToCloseDetailModal() {
    cy.get('[data-testid="icon:close"]').closest('button').click();
  }
}

export default new CommentModal();
