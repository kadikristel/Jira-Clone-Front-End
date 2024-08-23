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
    TimeTrackingModal.createIssue({
      description: issueData.randomDescription,
      title: issueData.randomTitle,
    });

    TimeTrackingModal.ensureIssueIsCreated(5, {
      title: issueData.randomTitle,
    });

    cy.contains(issueData.randomTitle).click();
  });
});
