import TimeTrackingModal from '../pages/TimeTrackingModal';
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

  it('Should add, edit and remove the time estimation for the issue', () => {
    const inputHours = 10;
    const editedHours = 20;

    // Create issue
    cy.get(TimeTrackingModal.issueCreateModal).within(() => {
      cy.get(TimeTrackingModal.issueType).click();
      cy.get(TimeTrackingModal.issueTypeBug).click();
      cy.get(TimeTrackingModal.descriptionField)
        .click()
        .type(issueData.randomDescription);
      cy.get(TimeTrackingModal.title).type(issueTitle);
      cy.get(TimeTrackingModal.reporter).click();
      cy.get(TimeTrackingModal.selectoptionLordGaben).click();
      cy.get(TimeTrackingModal.assignees).click();
      cy.get(TimeTrackingModal.selectOptionBabyYoda).click();
      cy.get(TimeTrackingModal.priorityDropdown).click();
      cy.get(TimeTrackingModal.selectOptionHigh).click();
      cy.contains('button', 'Create Issue').click();
      cy.wait(15000);
    });

    cy.get(TimeTrackingModal.issueCreateModal).should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    cy.get(TimeTrackingModal.boardlistBacklog)
      .should('be.visible')
      .wait(12000)
      .contains(issueTitle)
      .click();

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('contain', 'No time logged');
    });

    // Add time estimation
    cy.get(TimeTrackingModal.inputNumberField)
      .first()
      .clear()
      .type(`${inputHours}`)
      .wait(1000);

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.closeIcon)
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    // Reopen issue to verify added estimation
    cy.get(TimeTrackingModal.boardlistBacklog)
      .should('be.visible')
      .contains(issueTitle)
      .click();

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .should('exist')
        .and('have.value', `${inputHours}`)
        .wait(1000);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('be.visible')
        .and('contain', `${inputHours}h estimated`);

      // Edit time estimation
      cy.get(TimeTrackingModal.inputNumberField)
        .click()
        .clear()
        .type(`${editedHours}`)
        .wait(1000);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('be.visible')
        .and('contain', `${editedHours}h estimated`);
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
      .wait(1000)
      .contains(issueTitle)
      .click();

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .should('exist')
        .and('have.value', `${editedHours}`);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('be.visible')
        .and('contain', `${editedHours}h estimated`);
    });

    // Remove time estimation
    cy.get(TimeTrackingModal.inputNumberField).first().clear();

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('not.contain', `${editedHours}h estimated`);
  });
});

describe('Time tracking functionality for new issue', () => {
  const issueTitle = 'Time tracking';

  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should add and remove time logging for the issue', () => {
    const timeSpent = 2;
    const timeRemaining = 5;

    // Create issue
    cy.get(TimeTrackingModal.issueCreateModal).within(() => {
      cy.get(TimeTrackingModal.descriptionField)
        .click()
        .type(issueData.randomDescription);
      cy.get(TimeTrackingModal.title).type(issueTitle);
      cy.contains('button', 'Create Issue').click();
      cy.wait(15000);
    });

    cy.get(TimeTrackingModal.issueCreateModal).should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    cy.get(TimeTrackingModal.boardlistBacklog)
      .should('be.visible')
      .wait(12000)
      .contains(issueTitle)
      .click();

    cy.get(TimeTrackingModal.issueDetailsModal).should('be.visible');
    cy.get(TimeTrackingModal.stopwatchIcon).click();
    cy.get(TimeTrackingModal.trackingModal).should('be.visible');

    // Add time spent and time remaining
    cy.get(TimeTrackingModal.trackingModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .first()
        .should('be.visible')
        .focus()
        .clear()
        .type(timeSpent)
        .wait(1000);

      cy.get(TimeTrackingModal.inputNumberField)
        .last()
        .should('be.visible')
        .focus()
        .clear()
        .type(timeRemaining)
        .wait(1000);

      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('be.visible')
      .and('contain', `${timeSpent}h logged`);

    // Remove time spent and time logging
    cy.get(TimeTrackingModal.stopwatchIcon).click();

    cy.get(TimeTrackingModal.trackingModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .first()
        .should('be.visible')
        .focus()
        .clear();

      cy.get(TimeTrackingModal.inputNumberField)
        .last()
        .should('be.visible')
        .focus()
        .clear();

      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('be.visible')
      .and('contain', 'No time logged');
  });
});

describe('Time estimation and tracking functionalities for existing issue', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
      });
  });

  it.only('Should add, edit and remove the time estimation and tracking for the issue', () => {
    const inputHours = 10;
    const editedHours = 20;
    const timeSpent = 2;
    const timeRemaining = 5;

    cy.get(TimeTrackingModal.boardlistBacklog).should('be.visible');

    cy.get(TimeTrackingModal.issuesList).find('p').eq(1).click();

    // Clear existing values
    cy.get(TimeTrackingModal.inputNumberField).first().clear();
    cy.get(TimeTrackingModal.stopwatchIcon).click();
    cy.get(TimeTrackingModal.trackingModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .first()
        .should('be.visible')
        .focus()
        .clear();

      cy.get(TimeTrackingModal.inputNumberField)
        .last()
        .should('be.visible')
        .focus()
        .clear();

      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('contain', 'No time logged');

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.closeIcon)
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    // Reopen issue to verify that existing values are cleared
    cy.get(TimeTrackingModal.boardlistBacklog).should('be.visible').wait(2000);

    cy.get(TimeTrackingModal.issuesList).find('p').eq(1).click();

    // Add time estimation
    cy.get(TimeTrackingModal.inputNumberField)
      .first()
      .clear()
      .type(`${inputHours}`)
      .wait(1000);

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.closeIcon)
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    // Reopen issue to verify added estimation
    cy.get(TimeTrackingModal.boardlistBacklog).should('be.visible').wait(2000);

    cy.get(TimeTrackingModal.issuesList).find('p').eq(1).click();

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .should('exist')
        .and('have.value', `${inputHours}`)
        .wait(1000);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('contain', `${inputHours}h estimated`);

      // Edit time estimation
      cy.get(TimeTrackingModal.inputNumberField)
        .click()
        .clear()
        .type(`${editedHours}`)
        .wait(1000);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('be.visible')
        .and('contain', `${editedHours}h estimated`);
    });

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.closeIcon)
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    // Reopen issue to verify edited estimation
    cy.get(TimeTrackingModal.boardlistBacklog).should('be.visible').wait(1000);

    cy.get(TimeTrackingModal.issuesList).find('p').eq(1).click();

    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .should('exist')
        .and('have.value', `${editedHours}`)
        .wait(1000);

      cy.get(TimeTrackingModal.stopwatchIcon)
        .parent()
        .should('contain', `${editedHours}h estimated`);
    });

    // Remove time estimation
    cy.get(TimeTrackingModal.inputNumberField).first().clear();

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('not.contain', `${editedHours}h estimated`);

    // Time tracking block
    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('not.contain', `${inputHours}h estimated`);

    cy.get(TimeTrackingModal.stopwatchIcon).click();
    cy.get(TimeTrackingModal.trackingModal).should('be.visible');

    // Add time spent and time remaining
    cy.get(TimeTrackingModal.trackingModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .first()
        .should('be.visible')
        .focus()
        .clear()
        .type(timeSpent)
        .wait(1000);

      cy.get(TimeTrackingModal.inputNumberField)
        .last()
        .should('be.visible')
        .focus()
        .clear()
        .type(timeRemaining)
        .wait(1000);

      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get(TimeTrackingModal.stopwatchIcon)
      .parent()
      .should('contain', `${timeSpent}h logged`);

    // Remove time spent and time logging
    cy.get(TimeTrackingModal.stopwatchIcon).click();

    cy.get(TimeTrackingModal.trackingModal).within(() => {
      cy.get(TimeTrackingModal.inputNumberField)
        .first()
        .should('be.visible')
        .focus()
        .clear();

      cy.get(TimeTrackingModal.inputNumberField)
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
