import { faker } from '@faker-js/faker';

// Variables and functions

const randomWord = faker.word.noun();
const randomWords = faker.word.words(5);

const newTimeEstimate = '20';
const timeEstimate = '10';

const submitButton = 'button[type="submit"]';

function selectReporterBabyYoda() {
  cy.get('[data-testid="select:reporterId"]').click();
  cy.get('[data-testid="select-option:Baby Yoda"]').click();
}

// Function to create a new issue
function createNewIssue(title, description) {
  cy.visit('/');
  cy.url()
    .should('eq', ${Cypress.env('baseUrl')}project/board)
    .then((url) => {
      cy.visit(url + '/board?modal-issue-create=true');

      cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.get('.ql-editor').type(description);
        cy.get('.ql-editor').should('have.text', description);

        cy.get('input[name="title"]').type(title);
        cy.get('input[name="title"]').should('have.value', title);

        selectReporterBabyYoda();

        cy.get('[data-testid="form-field:userIds"]').click();
        cy.get('[data-testid="select-option:Lord Gaben"]').click();

        cy.get('[data-testid="select:priority"]').click();
        cy.get('[data-testid="select-option:Low"]').click();

        cy.get(submitButton).click();
      });

      cy.get('[data-testid="modal:issue-create"]').should('not.exist');
      cy.contains('Issue has been successfully created.').should('be.visible');

      cy.reload();
      cy.contains('Issue has been successfully created.').should('not.exist');

      cy.contains(title).click();
    });
}

describe('Time Estimation - Add, Edit, Delete', () => {
  beforeEach(() => {
    createNewIssue(randomWord, randomWords);
  });

  it('Should add a time estimate successfully', () => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', 'No time logged');

      cy.get('input[placeholder="Number"]')
        .type(timeEstimate)
        .should('have.value', timeEstimate);

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', timeEstimate);
    });
  });

  it('Should edit a time estimate successfully', () => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('input[placeholder="Number"]')
        .type(timeEstimate)
        .should('have.value', timeEstimate);

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', timeEstimate);

      cy.get('input[placeholder="Number"]')
        .clear()
        .type(newTimeEstimate)
        .should('have.value', newTimeEstimate);

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', newTimeEstimate);
    });
  });

  it('Should delete a time estimate successfully', () => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', 'No time logged');

      cy.get('input[placeholder="Number"]')
        .type(timeEstimate)
        .should('have.value', timeEstimate);

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', timeEstimate);

      cy.get('input[placeholder="Number"]').clear().should('have.value', '');

      cy.get('[data-testid="icon:stopwatch"]')
        .parent()
        .should('contain', 'No time logged');
    });
  });
});