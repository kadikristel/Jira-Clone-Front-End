import TimeTrackingModal from '../../pages/TimeTrackingModal';
import { faker } from '@faker-js/faker';

const issueData = {
  randomDescription: faker.lorem.sentence(),
};

describe('Time estimation functionality for new issue using POM approach', () => {
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
    const inputHours = '10';
    const editedHours = '20';

    // Create issue
    TimeTrackingModal.createIssue({
      type: 'Bug',
      description: issueData.randomDescription,
      title: issueTitle,
      reporter: 'Baby Yoda',
      assignee: 'Lord Gaben',
      priority: 'High',
    });

    TimeTrackingModal.ensureIssueIsCreated(5, {
      title: issueTitle,
    });

    TimeTrackingModal.getIssueModal().should('not.exist');
    TimeTrackingModal.getBoardlistBacklog(issueTitle);
    TimeTrackingModal.getStopwatchIcon('No time logged');

    // Add time estimation
    TimeTrackingModal.addTimeEstimation(inputHours);
    TimeTrackingModal.getStopwatchIcon(`${inputHours}h estimated`);
    TimeTrackingModal.closeIssueDetailsModal();

    // Reopen issue to verify added estimation
    TimeTrackingModal.getBoardlistBacklog(issueTitle);
    TimeTrackingModal.ensureIssueTimeEstimation(inputHours);
    TimeTrackingModal.getStopwatchIcon(`${inputHours}h estimated`);

    // Edit time estimation
    TimeTrackingModal.addTimeEstimation(editedHours);
    TimeTrackingModal.getStopwatchIcon(`${editedHours}h estimated`);
    TimeTrackingModal.closeIssueDetailsModal();

    // Reopen issue to verify edited estimation
    TimeTrackingModal.getBoardlistBacklog(issueTitle);
    TimeTrackingModal.ensureIssueTimeEstimation(editedHours);
    TimeTrackingModal.getStopwatchIcon(`${editedHours}h estimated`);

    // Remove time estimation
    TimeTrackingModal.removeTimeEstimation(editedHours);
    TimeTrackingModal.ensureStopwatchIconNotContainTime(editedHours);
  });
});

describe('Time tracking functionality for new issue using POM approach', () => {
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
    const timeSpent = '2';
    const timeRemaining = '5';

    // Create issue
    TimeTrackingModal.createIssue({
      type: 'Story',
      description: issueData.randomDescription,
      title: issueTitle,
      reporter: 'Pickle Rick',
      assignee: 'Baby Yoda',
      priority: 'Lowest',
    });

    TimeTrackingModal.ensureIssueIsCreated(5, {
      title: issueTitle,
    });

    TimeTrackingModal.getIssueModal().should('not.exist');
    TimeTrackingModal.getBoardlistBacklog(issueTitle);
    TimeTrackingModal.getStopwatchIcon('No time logged');

    // Open issue details and click on the stopwatch icon
    TimeTrackingModal.getIssueDetailsModal().should('be.visible');
    TimeTrackingModal.clickStopwatchIcon();
    TimeTrackingModal.getTimeTrackingModal().should('be.visible');

    // Add time spent and time remaining
    TimeTrackingModal.getTimeTrackingModal().within(() => {
      TimeTrackingModal.addTimeSpent(timeSpent);
      TimeTrackingModal.addTimeRemaining(timeRemaining);
      TimeTrackingModal.clickDoneButton();
    });

    TimeTrackingModal.getStopwatchIcon(`${timeSpent}h logged`);

    // Remove time spent and time logging
    TimeTrackingModal.clickStopwatchIcon();
    TimeTrackingModal.getTimeTrackingModal().within(() => {
      TimeTrackingModal.removeTimeSpent();
      TimeTrackingModal.removeTimeRemaining();
      TimeTrackingModal.clickDoneButton();
    });

    TimeTrackingModal.getStopwatchIcon('No time logged');
    TimeTrackingModal.ensureStopwatchIconNotContainTime(editedHours);
  });
});

describe('Time estimation and tracking functionalities for existing issue using POM approach', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
      });
  });

  it('Should add, edit and remove the time estimation and tracking for the issue', () => {
    const inputHours = '10';
    const editedHours = '20';
    const timeSpent = '2';
    const timeRemaining = '5';

    // Choosing issue
    TimeTrackingModal.getExistingIssue(1);

    // Clear existing values
    TimeTrackingModal.clearExistingValues();
    TimeTrackingModal.getStopwatchIcon('No time logged');

    TimeTrackingModal.closeIssueDetailsModal();

    // Reopen issue to verify that existing values are cleared
    TimeTrackingModal.getExistingIssue(1);

    // Add time estimation
    TimeTrackingModal.addTimeEstimation(inputHours);
    TimeTrackingModal.ensureIssueTimeEstimation(inputHours);
    TimeTrackingModal.closeIssueDetailsModal();

    // Reopen issue to verify added estimation
    TimeTrackingModal.getExistingIssue(1);
    TimeTrackingModal.ensureIssueTimeEstimation(inputHours);
    TimeTrackingModal.getStopwatchIcon(`${inputHours}h estimated`);

    // Edit time estimation
    TimeTrackingModal.addTimeEstimation(editedHours);
    TimeTrackingModal.ensureIssueTimeEstimation(editedHours);
    TimeTrackingModal.closeIssueDetailsModal();

    // Reopen issue to verify edited estimation
    TimeTrackingModal.getExistingIssue(1);
    TimeTrackingModal.ensureIssueTimeEstimation(editedHours);
    TimeTrackingModal.getStopwatchIcon(`${editedHours}h estimated`);

    // Remove time estimation
    TimeTrackingModal.removeTimeEstimation(editedHours);
    TimeTrackingModal.ensureStopwatchIconNotContainTime(editedHours);

    // Time tracking block
    TimeTrackingModal.ensureStopwatchIconNotContainTime(inputHours);
    TimeTrackingModal.clickStopwatchIcon();

    // Add time spent and time remaining
    TimeTrackingModal.getTimeTrackingModal().within(() => {
      TimeTrackingModal.addTimeSpent(timeSpent);
      TimeTrackingModal.addTimeRemaining(timeRemaining);
      TimeTrackingModal.clickDoneButton();
    });

    TimeTrackingModal.getStopwatchIcon(`${timeSpent}h logged`);

    // Remove time spent and time logging
    TimeTrackingModal.clickStopwatchIcon();
    TimeTrackingModal.getTimeTrackingModal().within(() => {
      TimeTrackingModal.removeTimeSpent();
      TimeTrackingModal.removeTimeRemaining();
      TimeTrackingModal.clickDoneButton();
    });

    TimeTrackingModal.getStopwatchIcon('No time logged');
    TimeTrackingModal.ensureStopwatchIconNotContainTime(editedHours);
  });
});
