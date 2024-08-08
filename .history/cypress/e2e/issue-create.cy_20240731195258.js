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
      title: 'TEST_TITLE',
      description: 'TEST_DESCRIPTION',
      reporter: 'Baby Yoda',
      assignee: 'Pickle Rick',
    });

    IssueModal.ensureIssueIsCreated(5, {
      title: 'TEST_TITLE',
      assignee: 'Pickle Rick',
    });
  });

  it('Should validate title is required field if missing', () => {
    IssueModal.getIssueModal().within(() => {
      cy.get(IssueModal.submitButton).click();
      cy.get('[data-testid="form-field:title"]').should(
        'contain',
        'This field is required'
      );
    });
  });

  it('Should create a custom issue and validate it successfully', () => {
    IssueModal.createIssue({
      type: 'Bug',
      title: 'Bug',
      description: 'My Bug description',
      reporter: 'Pickle Rick',
      assignee: 'Lord Gaben',
    });

    IssueModal.ensureIssueIsCreated(5, {
      title: 'Bug',
      assignee: 'Lord Gaben',
    });
  });

  it('Should create a custom issue and validate it successfully using Random Data Plugin', () => {
    IssueModal.createIssue({
      type: 'Task',
      title: issueData.randomTitle,
      description: issueData.randomDescription,
      reporter: 'Baby Yoda',
      assignee: 'Baby Yoda',
    });

    IssueModal.ensureIssueIsCreated(5, {
      title: issueData.randomTitle,
      assignee: 'Baby Yoda',
    });
  });
});
