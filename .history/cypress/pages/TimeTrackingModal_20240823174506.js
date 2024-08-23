class TimeTrackingModal {
  constructor() {
    this.issueCreateModal = '[data-testid="modal:issue-create"]';
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.trackingModal = '[data-testid="modal:tracking"]';
    this.descriptionField = '[data-testid="form-field:description"]';
    this.title = '[data-testid="form-field:title"]';
    this.boardlistBacklog = '[data-testid="board-list:backlog"]';
    this.stopwatchIcon = '[data-testid="icon:stopwatch"]';
    this.inputNumberField = 'input[placeholder="Number"]';
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
    return cy
      .get(this.stopwatchIcon)
      .parent()
      .should('contain', expectedText)
      .wait(1000);
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
      cy.get(this.title).type(issueDetails.title);
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
    cy.get(this.inputNumberField).first().clear().type(`${hours}`).wait(1000);
  }

  removeTimeEstimation() {
    cy.get(this.inputNumberField).first().clear().wait(1000);
    cy.get(this.inputNumberField).first().should('have.value', '');
    cy.get(this.stopwatchIcon)
      .parent()
      .should('not.contain', `${hours}h estimated`);
  }

  ensureIssueTimeEstimation(hours) {
    cy.get(this.inputNumberField)
      .should('exist')
      .and('have.value', `${hours}`)
      .wait(1000);
  }

  ensureStopwatchIconNotContainTime(hours) {
    cy.get(this.stopwatchIcon)
      .parent()
      .should('not.contain', `${hours}h estimated`);
  }

  addTimeSpent(hours) {
    cy.get(this.inputNumberField)
      .first()
      .should('be.visible')
      .clear()
      .type(`${hours}`)
      .wait(1000);
  }

  removeTimeSpent() {
    cy.get(this.inputNumberField).first().clear().wait(1000);
    this.getStopwatchIcon('No time logged');
  }

  addTimeRemaining(hours) {
    cy.get(this.inputNumberField)
      .last()
      .should('be.visible')
      .clear()
      .type(`${hours}`)
      .wait(1000);
  }

  removeTimeRemaining() {
    cy.get(this.inputNumberField).last().clear().wait(1000);
    this.getStopwatchIcon('No time logged');
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

  getExistingIssue(option) {
    cy.get(this.issuesList).find('p').eq(`${option}`).click();
  }

  clearExistingValues() {
    cy.get(this.inputNumberField).first().clear();
    cy.get(this.stopwatchIcon).click();
    cy.get(this.trackingModal).within(() => {
      cy.get(this.inputNumberField).first().should('be.visible').clear();
      cy.get(this.inputNumberField).last().should('be.visible').clear();

      cy.contains('button', 'Done').click().should('not.exist');
    });
  }
}

export default new TimeTrackingModal();
