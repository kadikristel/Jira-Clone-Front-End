class IssueModal {
  constructor() {
    this.submitButton = 'button[type="submit"]';
    this.issueModal = '[data-testid="modal:issue-create"]';
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.title = 'input[name="title"]';
    this.formFieldTitle = '[data-testid="form-field:title"]';
    this.issueType = '[data-testid="select:type"]';
    this.descriptionField = '.ql-editor';
    this.reporter = '[data-testid="select:reporterId"]';
    this.assignee = '[data-testid="select:userIds"]';
    this.backlogList = '[data-testid="board-list:backlog"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.deleteButton = '[data-testid="icon:trash"]';
    this.deleteButtonName = 'Delete issue';
    this.cancelDeletionButtonName = 'Cancel';
    this.confirmationPopup = '[data-testid="modal:confirm"]';
    this.closeDetailModalButton = '[data-testid="icon:close"]';
    this.priorityDropdown = '[data-testid="select:priority"]';
    this.storyIcon = '[data-testid="icon:story"]';
    this.bugIcon = '[data-testid="icon:bug"]';
    this.taskIcon = '[data-testid="icon:task"]';
    this.commentTextArea = 'textarea[placeholder="Add a comment..."]';
    this.issueComment = '[data-testid="issue-comment"]';
    this.addCommentArea = 'Add a comment...';
  }

  getIssueModal() {
    return cy.get(this.issueModal);
  }

  getIssueDetailModal() {
    return cy.get(this.issueDetailModal);
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
    cy.get(this.assignee).click('bottomRight');
    cy.get(`[data-testid="select-option:${assigneeName}"]`)
      .should('be.visible')
      .click();
  }

  editTitle(title) {
    cy.get(this.title).debounced('type', title);
  }

  editDescription(description) {
    cy.get(this.descriptionField).type(description);
  }

  createIssue(issueDetails) {
    this.getIssueModal().within(() => {
      this.selectIssueType(issueDetails.type);
      this.editDescription(issueDetails.description);
      this.editTitle(issueDetails.title);
      this.selectReporter(issueDetails.reporter);
      this.selectAssignee(issueDetails.assignee);
      this.selectPriority(issueDetails.priority);
      cy.get(this.submitButton).click();
    });
  }

  ensureIssueIsCreated(expectedAmountIssues, issueDetails) {
    cy.get(this.issueModal).should('not.exist');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get(this.backlogList)
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
        cy.get(this.issuesList)
          .should('have.length', expectedAmountIssues)
          .first()
          .find('p')
          .contains(issueDetails.title);
        cy.get(`[data-testid="avatar:${issueDetails.assignee}"]`).should(
          'be.visible'
        );
      });
  }

  ensureIssueIsVisibleOnBoard(issueTitle) {
    cy.get(this.issueDetailModal).should('not.exist');
    cy.reload();
    cy.contains(issueTitle).should('be.visible');
  }

  ensureIssueIsNotVisibleOnBoard(issueTitle) {
    cy.get(this.issueDetailModal).should('not.exist');
    cy.reload();
    cy.contains(issueTitle).should('not.exist');
  }

  validateIssueVisibilityState(issueTitle, isVisible = true) {
    cy.get(this.issueDetailModal).should('not.exist');
    cy.reload();
    cy.get(this.backlogList).should('be.visible');
    if (isVisible) cy.contains(issueTitle).should('be.visible');
    if (!isVisible) cy.contains(issueTitle).should('not.exist');
  }

  validateTitleIsRequiredFieldIfMissing() {
    cy.get(this.issueModal).within(() => {
      cy.get(this.submitButton).click();
      cy.get(this.formFieldTitle).should('contain', 'This field is required');
    });
  }

  clickDeleteButton() {
    cy.get(this.deleteButton).click();
    cy.get(this.confirmationPopup).should('be.visible');
  }

  confirmDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.contains(this.deleteButtonName).click();
    });
    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.backlogList).should('be.visible');
  }

  cancelDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.get('button').contains('Cancel').should('be.visible').click();
    });
    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.issueDetailModal).should('be.visible');
  }

  closeDetailModal() {
    cy.get(this.issueDetailModal)
      .get(this.closeDetailModalButton)
      .first()
      .click();
    cy.get(this.issueDetailModal).should('not.exist');
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

export default new IssueModal();
