import { issueData } from "./version_without_class&constructor/Consts";

describe('Issue deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });


   it('Should create a custom issue and validate it successfully and delete a custom issue and validate it', () => {
    IssueModal.createIssue({
      type: 'Story',
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: 'Pickle Rick',
      assignee: 'Lord Gaben',
      priority: 'Highest',
    });

    IssueModal.ensureIssueIsCreated(5, {
      icon: 'bug',
      title: 'Bug',
      assignee: 'Lord Gaben',
      priority: 'Highest',
    });
  });
