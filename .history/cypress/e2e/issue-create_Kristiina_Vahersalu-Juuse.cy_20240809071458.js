/* NB! Tests might have to be ran several times in order to be successful due to time out errors.
Sometimes it's even better to run them one by one to avoid time out errors.
*/

import IssueModal from '../pages/IssueModal';
import { faker } from '@faker-js/faker';

// ------------ Variables ------------ //

// for text
const randomWord = faker.word.noun();
const randomWords = faker.word.words(5);
let issueTitle = 'TEST_TITLE';
let issueDescription = 'TEST_DESCRIPTION';

// for dropdown menu
const selectIssueType = '[data-testid="select:type"]';
const selectPriority = '[data-testid="select:priority"]';
const selectReporter = '[data-testid="select:reporterId"]';
const selectAssignee = '[data-testid="form-field:userIds"]';

// for views
const backlogList = '[data-testid="board-list:backlog"]';
const issueList = '[data-testid="list-issue"]';
const issueCreate = '[data-testid="modal:issue-create"]';

// for buttons
const buttonSubmit = 'button[type="submit"]';

// ------------ Functions ------------ //

function fillIssueTitleAndDescription(issueTitle, issueDescription) {
  // Description
  cy.get('.ql-editor')
    .type(issueDescription)
    .should('have.text', issueDescription);
  // Title
  cy.get('input[name="title"]')
    .type(issueTitle)
    .should('have.value', issueTitle);
}

function chooseIssueType(issueType, type) {
  // issueType must have capital, e.g Bug
  cy.get(selectIssueType).click();
  cy.get(`[data-testid="select-option:${issueType}"]`)
    .wait(1000)
    .trigger('mouseover')
    .trigger('click');
  // type must be all small captions, e.g bug
  cy.get(`[data-testid="icon:${type}"]`).should('be.visible');
}

function choosePriority(priority) {
  cy.get(selectPriority).click();
  cy.get(`[data-testid="select-option:${priority}"]`)
    .wait(1000)
    .trigger('mouseover')
    .trigger('click');
}

function chooseReporter(reporter) {
  cy.get(selectReporter).click();
  cy.get(`[data-testid="select-option:${reporter}"]`).click();
}

function chooseAssignee(assignee) {
  cy.get(selectAssignee).click();
  cy.get(`[data-testid="select-option:${assignee}"]`).click();
}

function checkForSuccessMessage() {
  // Assert that modal window is closed and successful message is visible
  cy.get(issueCreate).should('not.exist');
  cy.contains('Issue has been successfully created.').should('be.visible');
}

function reloadBacklogAndAssert() {
  // Reload the page to be able to see recently created issue
  // Assert that successful message has dissappeared after the reload
  cy.reload();
  cy.contains('Issue has been successfully created.').should('not.exist');
}

// ------------ Test cases ------------ //

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should create a Story issue and validate it successfully', () => {
    cy.get(issueCreate).within(() => {
      fillIssueTitleAndDescription(issueTitle, issueDescription);
      chooseIssueType('Story', 'story');
      chooseReporter('Baby Yoda');
      chooseAssignee('Pickle Rick');

      cy.get(buttonSubmit).click();
    });

    checkForSuccessMessage();
    reloadBacklogAndAssert();

    // Wait for Backlog list to be visible
    cy.get(backlogList, { timeout: 60000 })
      .should('be.visible')
      .and('have.length', 1);

    cy.get(backlogList)
      .should('be.visible')
      .and('have.length', 1)
      .within(() => {
        cy.get(issueList)
          .should('have.length', 5)
          .first()
          .find('p')
          .contains(issueTitle)
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
            cy.get('[data-testid="icon:story"]').should('be.visible');
          });
      });

    cy.get(backlogList)
      .contains(issueTitle)
      .within(() => {
        cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
        cy.get('[data-testid="icon:story"]').should('be.visible');
      });
  });

  it.only('Should create a Bug issue and validate it successfully', () => {
    issueTitle = 'Bug';
    issueDescription = 'My bug description';

    cy.get(issueCreate).within(() => {
      fillIssueTitleAndDescription(issueTitle, issueDescription);
      chooseIssueType('Bug', 'bug');
      chooseReporter('Pickle Rick');
      chooseAssignee('Lord Gaben');
      choosePriority('Highest');

      cy.get(buttonSubmit).click();
    });

    checkForSuccessMessage();
    reloadBacklogAndAssert();

    // Wait for Backlog list to be visible.
    cy.get(backlogList, { timeout: 60000 })
      .should('be.visible')
      .and('have.length', 1);

    cy.get(backlogList)
      .should('be.visible')
      .and('have.length', 1)
      .within(() => {
        cy.get(issueList)
          .should('have.length', 5)
          .first()
          .find('p')
          .contains(issueTitle)
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
            cy.get('[data-testid="icon:arrow-up"]').should('be.visible');
            cy.get('[data-testid="icon:bug"]').should('be.visible');
          });
      });

    cy.get(backlogList)
      .contains('Bug')
      .within(() => {
        cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
        cy.get('[data-testid="icon:arrow-up"]').should('be.visible');
        cy.get('[data-testid="icon:bug"]').should('be.visible');
      });
  });

  it('Should create a Task issue using random data and validate it successfully', () => {
    issueTitle = randomWord;
    issueDescription = randomWords;

    cy.get(issueCreate).within(() => {
      fillIssueTitleAndDescription(issueTitle, issueDescription);
      chooseReporter('Baby Yoda');
      choosePriority('Low');

      cy.get(buttonSubmit).click();
    });

    checkForSuccessMessage();
    reloadBacklogAndAssert();

    // Wait for Backlog list to be visible.
    cy.get(backlogList, { timeout: 60000 })
      .should('be.visible')
      .and('have.length', 1);

    cy.get(backlogList)
      .should('be.visible')
      .and('have.length', 1)
      .within(() => {
        cy.get(issueList)
          .should('have.length', 5)
          .first()
          .find('p')
          .contains(issueTitle)
          .siblings()
          .within(() => {
            cy.get('[data-testid="icon:arrow-down"]').should('be.visible');
            cy.get('[data-testid="icon:task"]').should('be.visible');
          });
      });

    cy.get(backlogList)
      .contains(issueTitle)
      .within(() => {
        cy.get('[data-testid="icon:arrow-down"]').should('be.visible');
        cy.get('[data-testid="icon:task"]').should('be.visible');
      });
  });

  it('Should validate title is required field if missing', () => {
    cy.get(issueCreate).within(() => {
      cy.get(buttonSubmit).click();

      cy.get('[data-testid="form-field:title"]').should(
        'contain',
        'This field is required'
      );
    });
  });

  it('Should not add issue to backlog when user cancels its creation', () => {
    // Using POM method
    const title = 'Issue will be cancelled';
    const description = randomWords;
    const assigneeName = 'Lord Gaben';

    IssueModal.getIssueModal();
    IssueModal.editDescription(description);
    IssueModal.editTitle(title);
    IssueModal.selectAssignee(assigneeName);
    cy.get('button[type="button"]').last().click();
  });
});
