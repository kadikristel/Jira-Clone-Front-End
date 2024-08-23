import TimeTrackingModal from '../../pages/TimeTrackingModal';
import { faker } from '@faker-js/faker';

const issueData = {
  randomDescription: faker.lorem.sentence(),
  randomTitle: faker.lorem.sentence(),
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
    const inputHours = 10;
    const editedHours = 20;

    // Create issue
    TimeTrackingModal.createIssue({
      description: issueData.randomDescription,
      title: issueTitle,
    });

    TimeTrackingModal.ensureIssueIsCreated(5, {
      title: issueTitle,
    });

    TimeTrackingModal.getBoardlistBacklog(issueTitle);
    TimeTrackingModal.getStopwatchIcon('No time logged');

    // Add time estimation
    TimeTrackingModal.addTimeEstimation(inputHours);
    TimeTrackingModal.getStopwatchIcon(`${inputHours}h estimated`);
    TimeTrackingModal.closeIssueDetailsModal();

    // Reopen issue to verify added estimation
    TimeTrackingModal.getBoardlistBacklog(issueData.randomTitle);
    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      TimeTrackingModal.ensureIssueTimeEstimation(inputHours);
      TimeTrackingModal.getStopwatchIcon(`${inputHours}h estimated`);
    });

    // Edit time estimation
    TimeTrackingModal.addTimeEstimation(editedHours);
    TimeTrackingModal.getStopwatchIcon(`${editedHours}h estimated`);
    TimeTrackingModal.closeIssueDetailsModal();

    // Reopen issue to verify edited estimation
    TimeTrackingModal.getBoardlistBacklog(issueData.randomTitle);
    cy.get(TimeTrackingModal.issueDetailsModal).within(() => {
      TimeTrackingModal.ensureIssueTimeEstimation(editedHours);
      TimeTrackingModal.getStopwatchIcon(`${editedHours}h estimated`);
    });

    // Remove time estimation
    TimeTrackingModal.removeTimeEstimation(editedHours);
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
    const timeSpent = '2';
    const timeRemaining = '5';

    // Create issue
    TimeTrackingModal.createIssue({
      description: issueData.randomDescription,
      title: issueTitle,
    });

    TimeTrackingModal.ensureIssueIsCreated(5, {
      title: issueTitle,
    });
    TimeTrackingModal.getBoardlistBacklog(issueTitle);

    // Open issue details and click on the stopwatch icon
    TimeTrackingModal.getIssueDetailsModal();
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
  });
});
