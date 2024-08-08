import { faker } from '@faker-js/faker';

import {
  selectTypeDropdown,
  selectPriority,
  selectingReporterBabyYodaDropdown,
  selectingReporterPickleRickDropdown,
  selectingAssigneePickleRickDropdown,
  selectingAssigneeLordGabenDropdown,
  clickingCreateIssueButton,
} from '../pages/functions.js';

const selectors = {
  modalIssueCreate: '[data-testid="modal:issue-create"]',
  inputNameTitle: 'input[name="title"]',
  descriptionInputField: '.ql-editor',
  selectOptionBug: '[data-testid="select-option:Bug"]',
  selectOptionStory: '[data-testid="select-option:Story"]',
  bugIcon: '[data-testid="icon:bug"]',
  successMessage: 'Issue has been successfully created.',
  boardListBackLog: '[data-testid="board-list:backlog"]',
  listIssue: '[data-testid="list-issue"]',
  lordGabenAvatar: '[data-testid="avatar:Lord Gaben"]',
  priorityOptionHighest: '[data-testid="select-option:Highest"]',
  pickleRickAvatar: '[data-testid="avatar:Pickle Rick"]',
  storyIcon: '[data-testid="icon:story"]',
};

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        // System will already open issue creating modal in beforeEach block
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should create an issue and validate it successfully', () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get(selectors.modalIssueCreate).within(() => {
      // Type value to description input field
      cy.get(selectors.descriptionInputField).type('TEST_DESCRIPTION');
      cy.get(selectors.descriptionInputField).should(
        'have.text',
        'TEST_DESCRIPTION'
      );

      // Type value to title input field
      // Order of filling in the fields is first description, then title on purpose
      // Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get(selectors.inputNameTitle).type('TEST_TITLE');
      cy.get(selectors.inputNameTitle).should('have.value', 'TEST_TITLE');

      // Open issue type dropdown and choose Story
      selectTypeDropdown();
      cy.get(selectors.selectOptionStory)
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      cy.get(selectors.storyIcon).should('be.visible');

      // Select Baby Yoda from reporter dropdown
      selectingReporterBabyYodaDropdown();

      // Select Pickle Rick from assignee dropdown
      selectingAssigneePickleRickDropdown();

      // Click on button "Create issue"
      clickingCreateIssueButton();
    });

    // Assert that modal window is closed and successful message is visible
    cy.get(selectors.modalIssueCreate).should('not.exist');
    cy.contains(selectors.successMessage).should('be.visible');

    // Reload the page to be able to see recently created issue
    // Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains(selectors.successMessage).should('not.exist');

    // Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get(selectors.boardListBackLog)
      .should('be.visible')
      .and('have.length', 1)
      .within(() => {
        // Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get(selectors.listIssue)
          .should('have.length', 5)
          .first()
          .find('p')
          .contains('TEST_TITLE')
          .siblings()
          .within(() => {
            //Assert that correct avatar and type icon are visible
            cy.get(selectors.pickleRickAvatar).should('be.visible');
            cy.get(selectors.storyIcon).should('be.visible');
          });
      });

    cy.get(selectors.boardListBackLog)
      .contains('TEST_TITLE')
      .within(() => {
        // Assert that correct avatar and type icon are visible
        cy.get(selectors.pickleRickAvatar).should('be.visible');
        cy.get(selectors.storyIcon).should('be.visible');
      });
  });

  it('Should validate title is required field if missing', () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get(selectors.modalIssueCreate).within(() => {
      // Try to click create issue button without filling any data
      clickingCreateIssueButton();

      // Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should(
        'contain',
        'This field is required'
      );
    });
  });

  it('Should create a custom issue and validate it successfully', () => {
    cy.get(selectors.modalIssueCreate).within(() => {
      cy.get(selectors.descriptionInputField).type('My Bug description');
      cy.get(selectors.descriptionInputField).should(
        'have.text',
        'My Bug description'
      );
      cy.get(selectors.inputNameTitle).type('Bug');
      cy.get(selectors.inputNameTitle).should('have.value', 'Bug');
      selectTypeDropdown();
      cy.get(selectors.selectOptionBug)
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      cy.get(selectors.bugIcon).should('be.visible');
      selectPriority();
      cy.get(selectors.priorityOptionHighest)
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      selectingReporterPickleRickDropdown();
      selectingAssigneeLordGabenDropdown();
      clickingCreateIssueButton();
    });

    cy.get(selectors.modalIssueCreate).should('not.exist');
    cy.contains(selectors.successMessage).should('be.visible');
    cy.reload();
    cy.contains(selectors.successMessage).should('not.exist');

    cy.get(selectors.boardListBackLog)
      .should('be.visible')
      .and('have.length', 1)
      .within(() => {
        cy.get(selectors.listIssue)
          .should('have.length', 5)
          .first()
          .find('p')
          .contains('Bug')
          .siblings()
          .within(() => {
            cy.get(selectors.lordGabenAvatar).should('be.visible');
            cy.get(selectors.bugIcon).should('be.visible');
          });
      });
  });

  it.only('Should create a custom issue and validate it successfully using Random Data Plugin', () => {});
});
