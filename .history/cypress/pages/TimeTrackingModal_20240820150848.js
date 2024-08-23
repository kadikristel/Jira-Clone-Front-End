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

  getBoardlistBacklog(issueTitle) {
    cy.get(this.boardlistBacklog)
      .should('be.visible')
      .contains(issueTitle)
      .click();
  }

  getStopwatchIcon(expectedText) {
    cy.get(this.stopwatchIcon).parent().should('contain', expectedText);
  }

  clickStopwatchIcon() {
    cy.get(this.stopwatchIcon).click();
  }

  getTimeTrackingModal() {
    cy.get(this.trackingModal);
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
    this.getIssueModal().within(() => {
      this.editDescription(issueDetails.description);
      this.editTitle(issueDetails.title);
      cy.contains(this.createIssueButtonName).click();
      cy.wait(15000);
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

  addTimeEstimation(hours) {
    this.issueDetailsModal.within(() => {
      cy.get(this.inputPlaceholderNumber)
        .first()
        .clear()
        .type(`${hours}`)
        .wait(1000);
    });
  }

  removeTimeEstimation(hours) {
    cy.get(this.inputPlaceholderNumber).first().clear();
    cy.get(this.stopwatchIcon)
      .parent()
      .should('not.contain', `${hours}h estimated`);
  }

  ensureIssueTimeEstimation(hours) {
    this.issueDetailsModal.within(() => {
      cy.get(this.inputPlaceholderNumber)
        .should('exist')
        .and('have.value', hours)
        .wait(1000);
    });
  }

  closeIssueDetailsModal() {
    cy.get(this.issueDetailsModal)
      .get(this.closeIcon)
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.get(this.issueDetailsModal).should('not.exist');
  }
}

export default new TimeTrackingModal();
