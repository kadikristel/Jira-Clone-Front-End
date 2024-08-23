import IssueModal from '../pages/IssueModal';
import { faker } from '@faker-js/faker';

const issueData = {
  randomTitle: faker.lorem.words(),
  randomDescription: faker.lorem.sentence(),
};

describe('Time estimation functionality for existing issue', () => {
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
    const initialWidth = '100';

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('input[placeholder="Number"]').first().click().clear();
      cy.get('[data-testid="icon:stopwatch"]').click();
      cy.contains('input[placeholder="Number"]').eq(0).click().clear();

      cy.get('[data-testid="icon:close"]').first().should('be.visible').click();

      cy.get('input[placeholder="Number"]').first().should('have.value', '');

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
});

describe('Time estimation functionality for new issue', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it.only('Should add, edit and remove the estimation of the issue', () => {
    IssueModal.createIssue({
      type: 'Bug',
      description: issueData.randomDescription,
      title: issueData.randomTitle,
      reporter: 'Baby Yoda',
      assignee: 'Pickle Rick',
      priority: 'Medium',
    });

    IssueModal.ensureIssueIsCreated(5, {
      title: issueData.randomTitle,
      assignee: 'Pickle Rick',
      type: 'Bug',
    });

    cy.contains(issueData.randomTitle).click();
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
