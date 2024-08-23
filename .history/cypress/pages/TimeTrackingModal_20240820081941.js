class TimeTrackingModal {
  constructor() {
    this.issueCreateModal = '[data-testid="modal:issue-create"]';
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.trackingModal = '[data-testid="modal:tracking"]';
    this.descriptionField = '.ql-editor';
    this.inputNameTitle = 'input[name="title"]';
    this.boardlistBacklog = '[data-testid="board-list:backlog"]';
    this.stopwatchIcon = '[data-testid="icon:stopwatch"]';
    this.inputPlaceholderNumber = 'input[placeholder="Number"]';
    this.closeIcon = '[data-testid="icon:close"]';
    this.createIssueButtonName = 'Create Issue';
  }

  getIssueModal() {
    return cy.get(this.issueCreateModal);
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }

  editTitle(title) {
    cy.get(this.inputNameTitle).type(title);
  }

  editDescription(description) {
    cy.get(this.descriptionField).type(description);
  }

  clickCreateIssueButton() {
    cy.contains('button', this.createIssueButtonName).click();
  }

  createIssue(issueDetails) {
    this.getIssueDetailsModal().within(() => {
      this.editDescription(issueDetails.description);
      this.editTitle(issueDetails.title);
      cy.get(this.createIssueButton).click();
    });
  }

  ensureIssueIsCreated(expectedAmountIssues, issueDetails) {
    cy.get(this.issueCreateModal).should('not.exist');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get(this.boardlistBacklog)
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
        cy.get(this.issuesList)
          .should('have.length', expectedAmountIssues)
          .first()
          .find('p')
          .contains(issueDetails.title);
      });
  }

  addTimeEstimation() {
    this.inputPlaceholderNumber

    })
  }
}

export default new TimeTrackingModal();
