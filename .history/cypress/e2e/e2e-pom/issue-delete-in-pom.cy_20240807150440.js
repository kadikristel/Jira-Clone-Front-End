import IssueModal from '../../pages/IssueModal';

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.contains(issueTitle).click();
      });
  });

  const issueTitle = "Click on an issue to see what's behind it";

  it.only('Should delete issue successfully', () => {
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
          .should('not.contain', "Click on an issue to see what's behind it");
      });
  });

  it('Should cancel deletion process successfully', () => {
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
          .should('contain', "Click on an issue to see what's behind it");
      });
  });
});
