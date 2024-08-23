class TimeTrackingModal {
  constructor() {
    this.modalIssueCreate = '[data-testid="modal:issue-create"]';
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.trackingModal = this.descriptionField = '.ql-editor';
    this.inputNameTitle = 'input[name="title"]';
    this.boardlistBacklog = '[data-testid="board-list:backlog"]';
    this.stopwatchIcon = '[data-testid="icon:stopwatch"]';
    this.inputPlaceholderNumber = 'input[placeholder="Number"]';
    this.closeIcon = '[data-testid="icon:close"]';
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }
}

export default new TimeTrackingModal();
