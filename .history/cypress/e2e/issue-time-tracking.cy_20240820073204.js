import { faker } from '@faker-js/faker';
import TimeTrackingModal from '../pages/TimeTrackingModal';

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
    cy.get(TimeTrackingModal.modalIssueCreate).within(() => {
      cy.get(TimeTrackingModal.descriptionField)
        .click()
        .type(issueData.randomDescription);
      cy.get(TimeTrackingModal.inputNameTitle).type(issueTitle);
      cy.contains('button', 'Create Issue').click();
      cy.wait(15000);
    });

    cy.get(TimeTrackingModal.boardlistBacklog)
      .should('be.visible')
      .wait(6000)
      .contains(issueTitle)
      .click();

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('contain', 'No time logged');
    });

    // Add time estimation
    cy.get(TimeTrackingModal.inputPlaceholderNumber)
      .first()
      .clear()
      .type(`${inputHours}`);

    cy.wait(2000);

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.closeIcon)
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    cy.wait(2000);

    // Reopen issue to verify added estimation
    cy.get(TimeTrackingModal.boardlistBacklog)
      .should('be.visible')
      .contains(issueTitle)
      .click();

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.inputPlaceholderNumber)
        .should('exist')
        .and('have.value', `${inputHours}`);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('contain', `${inputHours}h estimated`);

      // Edit time estimation
      cy.get(TimeTrackingModal.inputPlaceholderNumber)
        .click()
        .clear()
        .type(`${editedHours}`);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('contain', `${editedHours}h estimated`);
    });

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.closeIcon)
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    // Reopen issue to verify edited estimation
    cy.get(TimeTrackingModal.boardlistBacklog)
      .should('be.visible')
      .wait(6000)
      .contains(issueTitle)
      .click();

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.inputPlaceholderNumber)
        .should('exist')
        .and('have.value', `${editedHours}`);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('contain', `${editedHours}h estimated`);
    });

    // Remove time estimation
    cy.get(TimeTrackingModal.inputPlaceholderNumber).first().clear();

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('not.contain', `${editedHours}h estimated`);
  });

  it('Should add and remove time logging of Time estimation issue', () => {
    const timeSpent = '2';
    const timeRemaining = '5';

    cy.get(TimeTrackingModal.modalIssueCreate).within(() => {
      cy.get(TimeTrackingModal.descriptionField)
        .click()
        .type(issueData.randomDescription);
      cy.get(TimeTrackingModal.inputNameTitle).type(issueTitle);
      cy.contains('button', 'Create Issue').click();
      cy.wait(15000);
    });

    cy.get(TimeTrackingModal.boardlistBacklog)
      .should('be.visible')
      .wait(6000)
      .contains(issueTitle)
      .click();

    cy.get(TimeTrackingModal.issueDetailsModal).should('be.visible');
    cy.get(TimeTrackingModal.stopwatchIcon).click();
    cy.get(TimeTrackingModal.trackingModal).should('be.visible');

    cy.get(TimeTrackingModal.trackingModal).within(() => {
      cy.get(TimeTrackingModal.inputPlaceholderNumber)
        .first()
        .should('be.visible')
        .focus()
        .clear()
        .type(timeSpent)
        .wait(2000);

      cy.get(TimeTrackingModal.inputPlaceholderNumber)
        .last()
        .should('be.visible')
        .focus()
        .clear()
        .type(timeRemaining)
        .wait(2000);

      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('contain', `${timeSpent}h logged`);

    // Remove time logging
    cy.get(TimeTrackingModal.stopwatchIcon).click();

    cy.get(TimeTrackingModal.trackingModal).within(() => {
      cy.get(TimeTrackingModal.inputPlaceholderNumber)
        .first()
        .should('be.visible')
        .focus()
        .clear();

      cy.get(TimeTrackingModal.inputPlaceholderNumber)
        .last()
        .should('be.visible')
        .focus()
        .clear();

      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('contain', 'No time logged');
  });
});
