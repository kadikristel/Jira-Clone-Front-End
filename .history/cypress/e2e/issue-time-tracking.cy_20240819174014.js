import { faker } from '@faker-js/faker';

const issueData = {
  randomDescription: faker.lorem.sentence(),
};

describe('Time estimation functionality for new issue', () => {
  const issueTitle = 'Time estimation';

  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should add, edit and remove the estimation of the issue', () => {
    const inputHours = 10;
    const editedHours = 20;

    // Create issue
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').click().type(issueData.randomDescription);
      cy.get('input[name="title"]').type(issueTitle);
      cy.contains('button', 'Create Issue').click();
      cy.wait(15000);
    });

    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .wait(6000)
      .contains(issueTitle)
      .click();

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', 'No time logged');
    });

    // Add time estimation
    cy.get('input[placeholder="Number"]').first().clear().type(`${inputHours}`);

    cy.wait(2000);

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:close"]')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    cy.wait(2000);

    // Reopen issue to verify added estimation
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .contains(issueTitle)
      .click();

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('input[placeholder="Number"]')
        .should('exist')
        .and('have.value', `${inputHours}`);

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', `${inputHours}h estimated`);

      // Edit time estimation
      cy.get('input[placeholder="Number"]')
        .click()
        .clear()
        .type(`${editedHours}`);

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', `${editedHours}h estimated`);
    });

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:close"]')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    // Reopen issue to verify edited estimation
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .wait(6000)
      .contains(issueTitle)
      .click();

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('input[placeholder="Number"]')
        .should('exist')
        .and('have.value', `${editedHours}`);

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', `${editedHours}h estimated`);
    });

    // Remove time estimation
    cy.get('input[placeholder="Number"]').first().clear();

    cy.get('[data-testid="icon:stopwatch"]')
      .parent()
      .should('not.contain', `${editedHours}h estimated`);

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:close"]').click();
    });
  });

  it.only('Should add and remove time logging of Time estimation issue', () => {
    const timeSpent = '2';
    const timeRemaining = '5';

    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').click().type(issueData.randomDescription);
      cy.get('input[name="title"]').type(issueTitle);
      cy.contains('button', 'Create Issue').click();
      cy.wait(15000);
    });

    // Open the issue created in the previous test
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .wait(6000)
      .contains(issueTitle)
      .click();

    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]').click();

      cy.get('.sc-CtfFt.ibRYdW').within(() => {
    cy.get('input[placeholder="Number"]')
      .first()
      .click({ force: true })
      .clear()
      .type(timeSpent);

    cy.get('input[placeholder="Number"]')
      .last()
      .click({ force: true })
      .clear()
      .type(timeRemaining);

    cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
      'contain.text',
      `${timeSpent}h logged`
    );
  });

    // Remove time logging
    cy.get('input[placeholder="Number"]').first().click().clear();
    cy.get('input[placeholder="Number"]').last().click().clear();

    cy.get('.sc-fhYwyz .sc-rBLzX div:last-child').should(
      'contain.text',
      'No time logged'
    );
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:close"]').click();
    });
  });
});
