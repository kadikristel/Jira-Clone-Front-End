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

    cy.reload(); // Reload the board to reflect the updated number of issues

    cy.get(IssueModal.backlogList)
      .should('be.visible')
      .within(() => {
        cy.get(IssueModal.issuesList)
          .should('have.length', 4) // Ensure there are 4 issues left
          .first()
          .find('p')
          .should('not.contain', issueData.randomTitle); // Ensure the deleted issue is not present
      });
  });

  it.only(
    'Create a custom issue, validate it successfully, start deletion, cancel deletion and validate cancellation'
  );
});
