import IssueModal from '../pages/IssueModal';

import { selectors, issueData } from '../pages/consts.js';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should create an issue and validate it successfully', () => {
    IssueModal.createIssue({
      type: 'Story',
      description: 'TEST_DESCRIPTION',
      title: 'TEST_TITLE',
      reporter: 'Baby Yoda',
      assignee: 'Pickle Rick',
    });

    IssueModal.ensureIssueIsCreated(5, {
      title: 'TEST_TITLE',
      assignee: 'Pickle Rick',
    });
  });

  it('Should validate title is required field if missing', () => {
    IssueModal.validateTitleIsRequiredFieldIfMissing();
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

  it('Should create a custom issue and validate it successfully using Random Data Plugin', () => {
    cy.get(selectors.modalIssueCreate).within(() => {
      cy.get(selectors.descriptionInputField).type(issueData.randomDescription);
      cy.get(selectors.descriptionInputField).should(
        'have.text',
        issueData.randomDescription
      );
      cy.get(selectors.inputNameTitle).type(issueData.randomTitle);
      cy.get(selectors.inputNameTitle).should(
        'have.value',
        issueData.randomTitle
      );
      selectTypeDropdown();
      cy.get(selectors.selectOptionTask)
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      cy.get(selectors.taskIcon).should('be.visible');
      selectPriority();
      cy.get(selectors.priorityOptionLow)
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      selectingReporterBabyYodaDropdown();
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
          .contains(issueData.randomTitle)
          .siblings()
          .within(() => {
            cy.get(selectors.taskIcon).should('be.visible');
          });
      });
  });
});
