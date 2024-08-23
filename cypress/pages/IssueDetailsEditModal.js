class IssueDetailsEditModal {
  constructor() {
    this.priorityDropdown = '[data-testid="select:priority"]';
    this.allPriorityOptions = '[data-testid^="select-option:"]';
    this.reporterDropdown = '[data-testid="select:reporter"]';
    this.descriptionField = '[data-testid="form-field:description"]';
    this.title = '[data-testid="form-field:title"]';
    this.backlogList = '[data-testid="board-list:backlog"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.shortSummaryTextarea = 'textarea[placeholder="Short summary"]';
    this.closeIcon = '[data-testid="icon:close"]';
  }
}

export default new IssueDetailsEditModal();
