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
    this.doneButtonName = 'Done';
  }

  getIssueModal() {
    return cy.get(this.issueCreateModal);
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }

  getBoardlistBacklog(issueTitle) {
    return cy
      .get(this.boardlistBacklog)
      .should('be.visible')
      .contains(issueTitle)
      .click();
  }

  getStopwatchIcon(expectedText) {
    return cy.get(this.stopwatchIcon).parent().should('contain', expectedText);
  }

  clickStopwatchIcon() {
    return cy.get(this.stopwatchIcon).click();
  }

  getTimeTrackingModal() {
    return cy.get(this.trackingModal);
  }

  clickCreateIssueButton() {
    return cy.contains('button', this.createIssueButtonName).click();
  }

  clickDoneButton() {
    return cy
      .contains('button', this.doneButtonName)
      .click()
      .should('not.exist');
  }

  createIssue(issueDetails) {
    this.getIssueModal().within(() => {
      cy.get(this.descriptionField).type(issueDetails.description);
      cy.get(this.inputNameTitle).type(issueDetails.title);
      this.clickCreateIssueButton();
    });
    cy.wait(15000);
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
    cy.get(this.inputPlaceholderNumber)
      .first()
      .clear()
      .type(`${hours}`)
      .wait(1000);
  }

  removeTimeEstimation(hours) {
    cy.get(this.inputPlaceholderNumber).first().clear();
    cy.get(this.stopwatchIcon)
      .parent()
      .should('not.contain', `${hours}h estimated`);
  }

  ensureIssueTimeEstimation(hours) {
    cy.get(this.inputPlaceholderNumber)
      .should('exist')
      .and('have.value', `${hours}`)
      .wait(1000);
  }

  addTimeSpent(hours) {
    cy.get(this.inputPlaceholderNumber)
      .first()
      .should('be.visible')
      .clear()
      .type(`${hours}`)
      .wait(1000);
  }

  removeTimeSpent() {
    cy.get(this.inputPlaceholderNumber).first().clear().wait(1000);
    this.getStopwatchIcon('No time logged');
  }

  ensureIssueTimeSpent(hours) {
    cy.get(this.inputPlaceholderNumber)
      .should('exist')
      .and('have.value', `${hours}h logged`)
      .wait(1000);
  }

  addTimeRemaining(hours) {
    cy.get(this.inputPlaceholderNumber)
      .last()
      .should('be.visible')
      .clear()
      .type(`${hours}`)
      .wait(1000);
  }

  removeTimeRemaining() {
    cy.get(this.inputPlaceholderNumber).last().clear().wait(1000);
    this.getStopwatchIcon('No time logged');
  }

  ensureTimeRemaining(hours) {
    cy.get(this.inputPlaceholderNumber)
      .should('exist')
      .and('have.value', `${hours}h remained`)
      .wait(1000);
  }

  closeIssueDetailsModal() {
    cy.get(this.issueDetailsModal).within(() => {
      cy.get(this.closeIcon)
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    cy.get(this.issueDetailsModal).should('not.exist');
  }
}

export default new TimeTrackingModal();
