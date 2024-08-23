class TimeTrackingModal {
  constructor() {
    this.issueCreateModal = '[data-testid="modal:issue-create"]';
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.trackingModal = '[data-testid="modal:tracking"]';
    this.issueType = '[data-testid="select:type"]';
    this.issueTypeBug = '[data-testid="icon:bug"]';
    this.issueTypeStory = '[data-testid="icon:story"]';
    this.descriptionField = '[data-testid="form-field:description"]';
    this.title = '[data-testid="form-field:title"]';
    this.reporter = '[data-testid="select:reporterId"]';
    this.assignees = '[data-testid="form-field:userIds"]';
    this.assigneeOption = '[data-testid="select-option"]';
    this.selectOptionPickleRick = '[data-testid="select-option:Pickle Rick"]';
    this.selectOptionBabyYoda = '[data-testid="select-option:Baby Yoda"]';
    this.selectoptionLordGaben = '[data-testid="select-option:Lord Gaben"]';
    this.priorityDropdown = '[data-testid="select:priority"]';
    this.selectOptionHigh = '[data-testid="select-option:High"]';
    this.selectOptionLowest = '[data-testid="select-option:Lowest"]';
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
      .get(this.stopwatchIcon, { timeout: 10000 })
      .should('contain', expectedText);
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

  selectIssueType(issueType) {
    if (issueType !== 'Task') {
      cy.get(this.issueType).click('bottomRight');

      cy.get(`[data-testid="select-option:${issueType}"]`)
        .should('be.visible')
        .trigger('mouseover')
        .wait(2000)
        .trigger('click');

      cy.get(this.issueType).should('contain', issueType);
    } else {
      cy.get(this.issueType).should('have.text', 'Task');
    }
  }

  selectPriority(priority) {
    if (priority !== 'Medium') {
      cy.get(this.priorityDropdown).click();

      cy.get(`[data-testid="select-option:${priority}"]`)
        .should('be.visible')
        .trigger('mouseover')
        .wait(200)
        .trigger('click');
    } else {
      cy.get(this.priorityDropdown).should('have.text', 'Medium');
    }
  }

  selectReporter(reporterName) {
    if (reporterName !== 'Lord Gaben') {
      cy.get(this.reporter).click();

      cy.get(`[data-testid="select-option:${reporterName}"]`)
        .should('be.visible')
        .trigger('mouseover')
        .wait(200)
        .trigger('click');
    } else {
      cy.get(this.reporter).should('have.text', 'Lord Gaben');
    }
  }

  selectAssignee(assigneeName) {
    cy.get(this.assignees).click('bottomRight');
    cy.get(`[data-testid="select-option:${assigneeName}"]`)
      .should('be.visible')
      .click();
  }

  createIssue(issueDetails) {
    this.getIssueModal().within(() => {
      this.selectIssueType(issueDetails.type);
      cy.get(this.descriptionField).type(issueDetails.description);
      cy.get(this.title).type(issueDetails.title);
      this.selectReporter(issueDetails.reporter);
      this.selectAssignee(issueDetails.assignee);
      this.selectPriority(issueDetails.priority);
      this.clickCreateIssueButton();
    });
    cy.wait(15000);
    cy.get(TimeTrackingModal.issueCreateModal).should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
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

  removeTimeEstimation(hours) {
    cy.get(this.inputNumberField).first().clear();
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
