class IssueDetailsEditModal {
  constructor() {
    this.priorityDropdown = '[data-testid="select:priority"]';
    this.allPriorityOptions = '[data-testid^="select-option:"]';
    this.reporterDropdown = '[data-testid="select:reporter"]';
    this.descriptionField = '.ql-editor';
    this.title = 'input[name="title"]';
    this.backlogList = '[data-testid="board-list:backlog"]';
    this.issuesList = '[data-testid="list-issue"]';
  }
}
