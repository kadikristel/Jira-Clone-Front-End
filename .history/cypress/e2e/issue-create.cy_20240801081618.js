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

  it('Should create an issue and validate it successfully', () => {
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

  it.only('Should validate title is required field if missing', () => {
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });
});
