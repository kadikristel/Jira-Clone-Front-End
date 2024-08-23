import IssueModal from '../pages/IssueModal';
import { faker } from '@faker-js/faker';

const issueData = {
  randomTitle: faker.lorem.words(),
  randomDescription: faker.lorem.sentence(),
};

describe('Time estimation functionality for new issue', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('Create Issue').click({ force: true });
      });
  });

  it.only('Should add, edit and remove the estimation of the issue', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').click().type(issueData.randomDescription);
      cy.get('input[name="title"]').type(issueData.randomTitle);
      cy.contains('button', 'Create Issue').click();
    });

    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .wait(6000)
      .contains(issueData.randomTitle)
      .click();

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', 'No time logged');
    });

    cy.get('input[placeholder="Number"]').first().clear().type('10');

    cy.wait(6000);

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:close"]')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    cy.wait(6000);

    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .contains(issueData.randomTitle)
      .click();

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('input[placeholder="Number"]')
        .should('exist')
        .and('have.value', '10');

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', '10h estimated');

      cy.get('input[placeholder="Number"]').click().clear().type(20);
      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', '20h estimated');
    });

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:close"]')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .contains(issueData.randomTitle)
      .click();

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('input[placeholder="Number"]')
        .should('exist')
        .and('have.value', '20');

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', '20h estimated');
    });

    cy.get('input[placeholder="Number"]').click().clear();
    cy.get('[data-testid="icon:stopwatch"]')
      .parent()
      .should('not.contain', '20h estimated');
  });
});

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
    const inputHours = 10;
    const editedHours = 16;
    const initialWidth = '100';

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('input[placeholder="Number"]').click().clear();
      cy.get('[data-testid="icon:stopwatch"]').click();
      cy.get('input[placeholder="Number"]').first().clear();
      cy.wait(1000);

      cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
        'contain.text',
        'No time logged'
      );

      cy.get('input[placeholder="Number"]')
        .first()
        .click()
        .clear()
        .type(inputHours)
        .blur();

      cy.wait(1000);

      cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
        'contain.text',
        `${inputHours}h estimated`
      );

      cy.get('input[placeholder="Number"]')
        .click({ force: true })
        .clear()
        .type(editedHours);
      cy.blur();
      cy.wait(2000);

      cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
        'contain.text',
        `${editedHours}h estimated`
      );

      cy.get('input[placeholder="Number"]')
        .first()
        .click({ force: true })
        .clear({ force: true });
      cy.blur();
      cy.wait(2000);

      cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
        'not.contain.text',
        `${editedHours}h estimated`
      );
    });
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
