import IssueModal from '../pages/IssueModal';
import { faker } from '@faker-js/faker';

describe('New issue deletion', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('Create Issue').click({ force: true });
      });
  });

  it('Should create a custom issue, validate it successfully, delete a custom issue and validate deletion successfully', () => {
    IssueModal.createIssue({
      type: 'Story',
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: 'Baby Yoda',
      assignee: 'Pickle Rick',
      priority: 'High',
    });

    IssueModal.ensureIssueIsCreated(5, {
      type: 'Story',
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

  it('Should create a custom issue, validate it successfully, start deletion, cancel deletion and validate cancellation successfully', () => {
    IssueModal.createIssue({
      type: 'Bug',
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: 'Pickle Rick',
      assignee: 'Lord Gaben',
      priority: 'Low',
    });

    IssueModal.ensureIssueIsCreated(5, {
      type: 'Bug',
      title: issueData.randomTitle,
      assignee: 'Lord Gaben',
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
          .should('contain', issueData.randomTitle);
      });
  });
});

describe('Existing issue deletion', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains("Click on an issue to see what's behind it.").click();
      });
  });

  it('Should delete issue and validate deletion successfully', () => {
    cy.get(IssueModal.issueDetailModal).should('be.visible');
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();

    cy.reload();

    cy.get(IssueModal.backlogList)
      .should('be.visible')
      .within(() => {
        cy.get(IssueModal.issuesList)
          .should('have.length', 3)
          .first()
          .find('p')
          .should('not.contain', "Click on an issue to see what's behind it.");
      });
  });
});

const issueData = {
  randomTitle: faker.lorem.words(),
  randomDescription: faker.lorem.sentence(),
};
