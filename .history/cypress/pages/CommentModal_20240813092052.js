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

  createComment() {
    this.getIssueDetailsModal().within(() => {
      this.clickAddCommentArea();
      this.
    });
  }

  clickAddCommentArea() {
    cy.contains('div', 'Add a comment...')
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  clickSaveButton() {
    cy.get('.sc-iuJeZd.kJzFof > button:first-child')
      .find('div')
      .contains('Save')
      .click();
  }

  clickCloseButton() {
    cy.get('[data-testid="icon:close"]').closest('button').click();
  }
}

export default new CommentModal();
