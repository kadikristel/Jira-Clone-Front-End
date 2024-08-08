import IssueModal from '../../pages/IssueModal';
import { faker } from '@faker-js/faker';

const issueTitle = 'You can use rich text with images in issue descriptions.';

describe('New issue deletion', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board')
       cy.contains('Create Issue').click({ force: true });
      });
  });

  it('Should create a custom issue, validate it successfully, delete a custom issue and validate deletion successfully', () => {
    IssueModal.createIssue({
      type: 'Task',
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: 'Baby Yoda',
      assignee: 'Pickle Rick',
      priority: 'High',

    })
});

describe('Existing issue deletion', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.contains(issueTitle).click();
      });
  });

  it('Should delete issue successfully', () => {
    cy.get(IssueModal.issueDetailModal).should('be.visible');
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);

    cy.get(IssueModal.backlogList)
      .should('be.visible')
      .within(() => {
        cy.get(IssueModal.issuesList)
          .should('have.length', 3)
          .first()
          .find('p')
          .should('not.contain', issueTitle);
      });
  });

  it.only('Should cancel deletion process successfully', () => {
    cy.get(IssueModal.issueDetailModal).should('be.visible');
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);

    cy.get(IssueModal.backlogList)
      .should('be.visible')
      .within(() => {
        cy.get(IssueModal.issuesList)
          .should('have.length', 4)
          .find('p')
          .eq(3)
          .should('contain', issueTitle);
      });
  });
});
