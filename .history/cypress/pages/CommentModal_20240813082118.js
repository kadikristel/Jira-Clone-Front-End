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
}

export default new CommentModal();
