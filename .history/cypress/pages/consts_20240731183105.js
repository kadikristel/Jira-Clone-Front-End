import { faker } from '@faker-js/faker';

const selectors = {
  modalIssueCreate: '[data-testid="modal:issue-create"]',
  inputNameTitle: 'input[name="title"]',
  descriptionInputField: '.ql-editor',
  selectOptionBug: '[data-testid="select-option:Bug"]',
  
  selectOptionTask: '[data-testid="select:type"]',
  bugIcon: '[data-testid="icon:bug"]',
  storyIcon: ,
  taskIcon: '[data-testid="icon:task"]',
  successMessage: 'Issue has been successfully created.',
  boardListBackLog: '[data-testid="board-list:backlog"]',
  listIssue: '[data-testid="list-issue"]',
  
  priorityOptionHighest: '[data-testid="select-option:Highest"]',
  priorityOptionLow: '[data-testid="select-option:Low"]',
  pickleRickAvatar: '[data-testid="avatar:Pickle Rick"]',
};

const issueData = {
  randomTitle: faker.lorem.words(),
  randomDescription: faker.lorem.sentence(),
};

export { selectors, issueData };
