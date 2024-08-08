import IssueModal from '../../pages/IssueModal';
import { faker } from '@faker-js/faker';

const issueTitle = "Click on an issue to see what's behind it.";

describe('New issue deletion', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains(issueTitle).click();
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
        cy.contains(issueTitle).click();
      });
  });

  it('Should delete issue successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.validateIssueVisibilityState(issueTitle, false);

    cy.reload();

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
    IssueModal.validateIssueVisibilityState(issueTitle, true);

    cy.reload();

    cy.get(IssueModal.backlogList)
      .should('be.visible')
      .within(() => {
        cy.get(IssueModal.issuesList)
          .should('have.length', 4)
          .first()
          .find('p')
          .should('contain', issueTitle);
      });
  });
});
