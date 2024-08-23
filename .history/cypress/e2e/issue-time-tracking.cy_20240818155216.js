import TimeTrackingModal from '../pages/TimeTrackingModal';

describe('Time estimation functionality', () => {
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

  it.only('Should add, edit and remove the estimation of an issue', () => {
    const inputHours = 10;
    const editedHours = 16;
    const initialWidth = '100';

    TimeTrackingModal.getIssueDetailsModal().within(() => {
      cy.get('input[placeholder="Number"]').click().clear();
      cy.wait(1000);
      cy.get('[data-testid="icon:stopwatch"]').click();
      cy.get('input[placeholder="Number"]').first().click().clear();

      cy.get('input[placeholder="Number"]').click().type(inputHours);
      cy.get('body').click();
      cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
        'contain.text',
        `${inputHours}h estimated`
      );
      cy.get('.sc-fhYwyz .sc-jzgbtB .sc-gJWqzi').should(
        'have.attr',
        'width',
        initialWidth
      );
      cy.get('[data-testid="icon:close"]')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('input[placeholder="Number"]').click().clear().type(editedHours);
      cy.get('body').click();
      cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
        'contain.text',
        `${editedHours}h estimated`
      );
      cy.get('.sc-fhYwyz .sc-jzgbtB .sc-gJWqzi').should(
        'not.have.attr',
        'width',
        initialWidth
      );

      cy.get('input[placeholder="Number"]').click().clear();
      cy.get('body').click();
      cy.wait(2000);
      cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
        'not.contain.text',
        `${editedHours}h estimated`
      );
      cy.get('.sc-fhYwyz .sc-jzgbtB .sc-gJWqzi').should(
        'have.attr',
        'width',
        initialWidth
      );
    });
  });

  describe('Time tracking functionality', () => {
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

    it('Should add, edit and remove time tracking ', () => {
      const initialWidth = '100';

      cy.get('[data-testid="icon:stopwatch"]').click();
      cy.get('input[placeholder="Number"]').first().click().clear();

      cy.get('input[placeholder="Number"]').click().clear();
      cy.get('body').click();
      cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
        'contain.text',
        'No time logged'
      );
      cy.get('.sc-fhYwyz .sc-jzgbtB .sc-gJWqzi').should(
        'not.have.attr',
        'width',
        initialWidth
      );
    });
  });
});
