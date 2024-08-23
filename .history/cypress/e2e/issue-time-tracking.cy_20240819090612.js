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
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it.only('Should add, edit and remove the estimation of the issue', () => {
    const inputHours = 10;
    const editedHours = 16;
    const initialWidth = '100';

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

    cy.get('[data-testid="icon:stopwatch"]')
      .parent()
      .should('contain', 'No time logged');

    cy.get('input[placeholder="Number"]')
      .first()
      .should('be.visible')
      .click()
      .clear()
      .type(`${inputHours}`, { force: true })
      .blur();

    cy.wait(5000);
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

    cy.contains(issueData.randomTitle).click();

    cy.get('input[placeholder="Number"]').should('have.value', `${inputHours}`);
    cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
      'contain.text',
      `${inputHours}h estimated`
    );
    cy.get('.sc-fhYwyz .sc-jzgbtB .sc-gJWqzi').should(
      'have.attr',
      'width',
      initialWidth
    );
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
