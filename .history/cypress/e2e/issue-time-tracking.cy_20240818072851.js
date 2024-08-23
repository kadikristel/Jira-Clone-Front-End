import TimeTrackingModal from '../pages/TimeTrackingModal';

describe('Time tracking', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains(
          'Try dragging issues to different columns to transition their status.'
        ).click();
      });
  });

  it.only('Should add, edit and remove the estimation of the issue', () => {
    let inputHours = 8;

    TimeTrackingModal.getIssueDetailsModal().within(() => {
      cy.get('input[placeholder="Number"]').click().clear();
      if ((inputHours = 8)) {
        cy.get();
      }
    });
  });
});
