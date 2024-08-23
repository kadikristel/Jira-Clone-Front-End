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
    cy.get('div.sc-fMiknA.edMYdI')
      .find('textarea[placeholder="Add a comment..."]')
      .should('be.visible')
      .click();
  }

  createComment(commentDetails) {
    this.getIssueDetailModal().within(() => {
      cy.contains(this.addCommentArea).click();
      cy.get(this.commentTextArea).type(commentDetails),
        cy.contains('button', 'Save').click().should('not.exist'),
        cy.get(this.addCommentArea).should('exist'),
        cy.get(this.issueComment).should('contain', commentDetails);
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
