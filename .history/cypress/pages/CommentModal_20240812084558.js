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
}
