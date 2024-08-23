import { faker } from '@faker-js/faker';

describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should(
        'contain',
        'Lord Gaben'
      );

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should(
        'have.text',
        'Pickle Rick'
      );

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow').click().should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save').click().should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should(
        'have.text',
        title
      );
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
});

describe('JavaScript tasks 1&2', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains("Click on an issue to see what's behind it.").click();
      });
  });

  it('Should check Priority dropdown values for existing issue', () => {
    const expectedLength = 5;
    let priorityValues = [];

    cy.get('[data-testid="select:priority"]')
      .contains('Low')
      .invoke('text')
      .then((selectedPriorityOption) => {
        priorityValues.push(selectedPriorityOption.trim());

        cy.get('[data-testid="select:priority"]').click('bottomRight');

        cy.get('[data-testid^="select-option:"]')
          .each(($option) => {
            const optionText = $option.text().trim();
            priorityValues.push(optionText);
            cy.log(
              'Added value:',
              optionText,
              'Array length:',
              priorityValues.length
            );
          })
          .then(() => {
            const expectedPriorities = [
              'Medium',
              'Lowest',
              'Low',
              'High',
              'Highest',
            ];

            expect(priorityValues).to.have.length(expectedLength);
            expect(priorityValues).to.have.members(expectedPriorities);
          });
      });

    it("Should check that reporter's name has only characters", () => {
      const regex = /^[A-Za-z\s]+$/;

      cy.get('[data-testid="select:reporter"]')
        .invoke('text')
        .then((reporterName) => {
          cy.log(`Reporter Name: ${reporterName.trim()}`);
          expect(reporterName.trim()).to.match(regex);
        });
    });
  });
});

describe('JavaScript task 3 - removing unnecessary spaces on the board view', () => {
  const issueTitle =
    '  This  is       my   test    to         remove           unnecessary     spaces';

  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  const issueData = { randomDescription: faker.lorem.sentence() };

  it.only('Should remove unnecessary spaces', () => {
    const trimmedIssueTitle = issueTitle.replace(/\s+/g, ' ').trim();

    cy.get('.ql-editor').click().type(issueData.randomDescription);
    cy.get('input[name="title"]').click().type(issueTitle);
    cy.contains('button', 'Create Issue').click();
    cy.wait(15000);

    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .wait(20000);

    cy.get('[data-testid="list-issue"]').first().click();
    cy.get('textarea[placeholder="Short summary"]')
      .click()
      .clear()
      .type(trimmedIssueTitle)
      .type('{enter}');

    cy.contains('[data-testid="icon:close"]').first().click();
    cy.get('[data-testid="list-issue"]').contains(trimmedIssueTitle);
  });
});
