import IssueModal from '../pages/IssueModal';

//import { selectors, issueData } from '../pages/consts.js';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it.only('Should create an issue and validate it successfully', () => {
    IssueModal.createIssue({
      type: 'Story',
      description: 'TEST_DESCRIPTION',
      title: 'TEST_TITLE',
      reporter: 'Baby Yoda',
      assignee: 'Pickle Rick',
    });

    IssueModal.ensureIssueIsCreated();

    cy.get(this.issueModal).should('not.exist');
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
          .contains('TEST_TITLE')
          .siblings()
          .within(() => {
            cy.get(selectors.pickleRickAvatar).should('be.visible');
            cy.get(this.storyIcon).should('be.visible');
          });
      });

    cy.get(selectors.boardListBackLog)
      .contains('TEST_TITLE')
      .within(() => {
        cy.get(selectors.pickleRickAvatar).should('be.visible');
        cy.get(this.storyIcon).should('be.visible');
      });
  });

  it('Should validate title is required field if missing', () => {
    cy.get(this.issueModal).within(() => {
      clickingCreateIssueButton();
      cy.get('[data-testid="form-field:title"]').should(
        'contain',
        'This field is required'
      );
    });
  });

  it('Should create a custom issue and validate it successfully', () => {
    cy.get(this.issueModal).within(() => {
      cy.get(this.descriptionField).type('My Bug description');
      cy.get(this.descriptionField).should('have.text', 'My Bug description');
      cy.get(this.title).type('Bug');
      cy.get(this.title).should('have.value', 'Bug');
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

    cy.get(this.issueModal).should('not.exist');
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
    cy.get(this.issueModal).within(() => {
      cy.get(this.descriptionField).type(issueData.randomDescription);
      cy.get(this.descriptionField).should(
        'have.text',
        issueData.randomDescription
      );
      cy.get(this.title).type(issueData.randomTitle);
      cy.get(this.title).should('have.value', issueData.randomTitle);
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

    cy.get(this.issueModal).should('not.exist');
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
