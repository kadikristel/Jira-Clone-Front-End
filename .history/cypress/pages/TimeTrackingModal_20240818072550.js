class TimeTrackingModal {
  constructor() {
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.inputNumberField = 'input[placeholder="Number"]';
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }
}

export default new TimeTrackingModal();
