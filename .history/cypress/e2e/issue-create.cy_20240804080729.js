import IssueModal from '../pages/IssueModal';

import { selectors, issueData } from '../pages/consts.js';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it.only('Should create an issue and validate it successfully', () => {
    IssueModal.createIssue({
      type: 'Story',
      description: 'TEST_DESCRIPTION',
      title: 'TEST_TITLE',
      reporter: 'Baby Yoda',
      assignee: 'Pickle Rick',
    });

    IssueModal.ensureIssueIsCreated(5, {
      title: 'TEST_TITLE',
      assignee: 'Pickle Rick',
    });
  });

  it('Should validate title is required field if missing', () => {
    IssueModal.validateTitleIsRequiredFieldIfMissing();
  });

  it('Should create a custom issue and validate it successfully', () => {
    IssueModal.createIssue({
      type: 'Bug',
      description: 'My Bug description',
      title: 'Bug',
      reporter: 'Pickle Rick',
      assignee: 'Lord Gaben',
      priority: 'Highest',
    });

    cy.log('Ensuring the issue is created');

    IssueModal.ensureIssueIsCreated(5, {
      icon: 'bug',
      title: 'Bug',
      assignee: 'Lord Gaben',
      priority: 'Highest',
    });
  });

  it('Should create a custom issue and validate it successfully using Random Data Plugin', () => {
    IssueModal.createIssue({
      type: "Task",
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: "Baby Yoda",
      priority: "Low"
    })

     cy.log('Ensuring the issue is created');

      IssueModal.ensureIssueIsCreated(5, {
        icon: 'task',
        title: issueData.randomTitle,
        reporter: "Baby Yoda",
        priority: 'Low',
      });


    