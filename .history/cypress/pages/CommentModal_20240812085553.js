class CommentModal {
  constructor() {
    this.issueModal = '[data-testid="modal:issue-create"]';
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.issueComment = '[data-testid="issue-comment"]';
    this.addCommentArea = 'Add a comment...';
  }

  getIssueModal() {
    return cy.get(this.issueModal);
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }

  clickAddCommentArea() {
    cy.get(this.addCommentArea).click();
  }

  createComment(commentDetails) {
    this.getIssueDetailsModal().within(() => {
      cy.get(this.commentTextArea).type(newComment),
        cy.contains('button', 'Save').click().should('not.exist'),
        cy.get(this.addCommentArea).should('exist'),
        cy.get(this.issueComment).should('contain', newComment);
    });
  }
}

export default new CommentModal();
