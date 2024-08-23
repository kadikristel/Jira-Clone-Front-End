import IssueModal from '../pages/IssueModal';
import { faker } from '@faker-js/faker';

const issueData = {
  randomTitle: faker.lorem.words(),
  randomDescription: faker.lorem.sentence(),
};

describe('Time tracking functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it.only('Should add, edit and remove time estimation to a created issue', () => {
    const inputHours = 10;
    const editedHours = 16;
    const initialWidth = '100';

    IssueModal.createIssue({
      type: 'Story',
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: 'Baby Yoda',
      assignee: 'Lord Gaben',
      priority: 'High',
    });

    IssueModal.ensureIssueIsCreated(5, {
      title: issueData.randomTitle,
      reporter: 'Baby Yoda',
      priority: 'High',
      assignee: 'Lord Gaben',
    });

    cy.wait(20000);
    cy.contains(issueData.randomTitle).should('be.visible').click();

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.contains(issueData.randomTitle).should('be.visible');

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', 'No time logged');

      cy.get('input[placeholder="Number"]').click().type(inputHours);
      cy.get('.sc-cbkKFq kSPstu').click();
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

      cy.contains(issueData.randomTitle).should('be.visible').click();

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
