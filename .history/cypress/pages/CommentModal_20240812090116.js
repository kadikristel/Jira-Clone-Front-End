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
    cy.contains(this.addCommentArea).click();
  }

  createComment(commentDetails) {
    this.getIssueDetailsModal().within(() => {
      cy.get(this.commentTextArea).type(commentDetails),
        cy.contains('button', 'Save').click().should('not.exist'),
        cy.get(this.addCommentArea).should('exist'),
        cy.get(this.issueComment).should('contain', commentDetails);
    });
  }
}

export default new CommentModal();
