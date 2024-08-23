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

  it('Should add, edit and remove the estimation of the issue', () => {
    const inputHours = 8;
    const editedHours = 16;

    cy.get('input[placeholder="Number"]').click().clear().type(inputHours);
    cy.get('body').click();
    cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
      'contain.text',
      `${inputHours}h estimated`
    );
    cy.get('.sc-fhYwyz .sc-jzgbtB .sc-gJWqzi').should(
      'have.attr',
      'width',
      '100'
    );

    cy.get('input[placeholder="Number"]').click().clear().type(editedHours);
    cy.get('body').click();
    cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
      'contain.text',
      `${editedHours}h estimated`
    );

    cy.get('input[placeholder="Number"]').click().clear();
    cy.get('body').click();
    cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
      'not.contain.text',
      `${editedHours}h estimated`
    );
  });
});
