import IssueModal from '../pages/IssueModal';
import { faker } from '@faker-js/faker';

describe('Issue deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('Create Issue').click({ force: true });
      });
  });

  const issueData = {
    randomTitle: faker.lorem.words(),
    randomDescription: faker.lorem.sentence(),
  };

  it('Should create a custom issue, validate it successfully, delete a custom issue and validate deletion', () => {
    IssueModal.createIssue({
      type: 'Story',
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: 'Baby Yoda',
      assignee: 'Pickle Rick',
      priority: 'High',
    });

    IssueModal.ensureIssueIsCreated(5, {
      icon: 'story',
      title: issueData.randomTitle,
      assignee: 'Pickle Rick',
      priority: 'High',
    });

    cy.contains(issueData.randomTitle).click();
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueData.randomTitle);

    cy.reload();

    cy.get(IssueModal.backlogList)
      .should('be.visible')
      .within(() => {
        cy.get(IssueModal.issuesList)
          .should('have.length', 4)
          .first()
          .find('p')
          .should('not.contain', issueData.randomTitle);
      });
  });

  it.only('Create a custom issue, validate it successfully, start deletion, cancel deletion and validate cancellation', () => {
    IssueModal.createIssue({
      type: 'Task',
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: 'Lord Gaben',
      assignee: 'Baby Yoda',
      priority: 'Low',
    });

    IssueModal.ensureIssueIsCreated(5, {
      icon: 'task',
      title: issueData.randomTitle,
      assignee: 'Baby Yoda',
      priority: 'Low',
    });

    cy.contains(issueData.randomTitle).click();
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();

    cy.reload();

    cy.get(IssueModal.backlogList)
      .should('be.visible')
      .within(() => {
        cy.get(IssueModal.issuesList)
          .should('have.length', 5)
          .first()
          .find('p')
          .should('contains', issueData.randomTitle);
      });
  });
});
