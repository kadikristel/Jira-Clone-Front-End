import IssueModal from '../../pages/IssueModal';

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

  const issueTitle = "Click on an issue to see what's behind it.";

  it('Should delete issue successfully', () => {
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

  it.only('Should cancel deletion process successfully', () => {
    cy.get(IssueModal.issueDetailModal).should('be.visible');
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();

    cy.reload();

    cy.get(IssueModal.backlogList)
      .should('be.visible')
      .within(() => {
        cy.get(IssueModal.issuesList)
          .should('have.length', 4)
          .first()
          .find('p')
          .should('contain', "Click on an issue to see what's behind it.");
      });
  });
});
