/**
 * This is an example file and approach for POM in Cypress
 */

/* In order to run this code succesfully add following method to IssueModal.js file

ensureNrOfIssuesAfterDel(expectedAmountIssues, issueTitle) {
    cy.get(this.backlogList)
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
        cy.get(this.issuesList).should('have.length', expectedAmountIssues);
      });
    cy.get(this.backlogList).contains(issueTitle).should('not.exist');
  }

*/

import IssueModal from '../pages/IssueModal';
import { faker } from '@faker-js/faker';

// Variables
const randomWord = faker.word.noun();
const randomWords = faker.word.words(5);

const backlogList = '[data-testid="list-issue"]';
const backlog = '[data-testid="board-list:backlog"]';

const createIssueButton = '[data-testid="icon:plus"]';

const issueTitle = 'This is an issue of type: Task.';
let expectedAmountIssues = 3;
let isVisible = false;

// Test cases
describe('Existing issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        //open issue detail modal with title from line 16
        cy.contains(issueTitle).click();
      });
  });

  it('Should delete issue successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.validateIssueVisibilityState(issueTitle, isVisible);
    IssueModal.ensureNrOfIssuesAfterDel(expectedAmountIssues, issueTitle);
  });

  it('Should cancel deletion process successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});

describe('New issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.get(createIssueButton).click();
      });
  });

  it('Should delete newly created issue and validate it successfully', () => {
    const issueDetails = {
      title: randomWord,
      type: 'Bug',
      description: randomWords,
      assignee: 'Lord Gaben',
    };

    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(5, issueDetails);

    cy.contains(issueDetails.title).click();
    IssueModal.getIssueDetailModal()
      .should('be.visible')
      .and('contain', randomWord);

    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.validateIssueVisibilityState(randomWord, isVisible);
    IssueModal.ensureNrOfIssuesAfterDel(4, randomWord);
  });

  it('Should NOT delete newly created issue if user cancels its deletion and validate it successfully', () => {
    const issueDetails = {
      title: randomWord,
      type: 'Story',
      description: randomWords,
      assignee: 'Baby Yoda',
    };

    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(5, issueDetails);

    cy.contains(issueDetails.title).click();
    IssueModal.getIssueDetailModal()
      .should('be.visible')
      .and('contain', randomWord);

    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(5, randomWord);
  });
});
