import TimeTrackingModal from '../../pages/TimeTrackingModal';
import { faker } from '@faker-js/faker';

const issueData = {
  randomDescription: faker.lorem.sentence(),
  randomTitle: faker.lorem.sentence(),
};

describe('Time estimation functionality for new issue using POM approach', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should add, edit and remove time estimation of the issue', () => {
    const inputHours = 10;
    const editedHours = 20;

    // Create issue
    TimeTrackingModal.createIssue({
      description: issueData.randomDescription,
      title: issueData.randomTitle,
    });

    TimeTrackingModal.ensureIssueIsCreated(5, {
      title: issueData.randomTitle,
    });

    TimeTrackingModal.getBoardlistBacklog(issueData.randomTitle);
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
