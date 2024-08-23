class CommentModal {
  constructor() {
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.issueComment = '[data-testid="issue-comment"]';
    this.addCommentArea = 'Add a comment...';
  }

  getIssueDetailModal() {
    return cy.get(this.issueDetailModal);
  }

  clickAddCommentArea() {
    cy.get(this.addCommentArea).find().contains('Add a comment...').click();
  }

  createComment(commentDetails) {
     this.getIssueDetailModal().within(() => {
       this.clickAddCommentArea(commentDetails.clickArea);
       this.
     });
  }

  clickSaveButton() {
    cy.get('.sc-iuJeZd.kJzFof > button:first-child')
      .find('div')
      .contains('Save')
      .click();
  }
}

export default new CommentModal();
