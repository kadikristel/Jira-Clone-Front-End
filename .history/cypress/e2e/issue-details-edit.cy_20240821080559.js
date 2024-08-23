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

describe('Priority dropdown', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains("Click on an issue to see what's behind it.").click();
      });
  });

  it.only('Should check Priority dropdown values for existing issue', () => {
    const expectedLength = 5;
    let priorityValues = [];

    cy.get('[data-testid="select:priority"]')
      .should('contain', 'Low')
      .invoke('text')
      .then((selectedPriorityOption) => {
        priorityValues.push(selectedPriorityOption.trim());
        cy.log(`Default selected value: ${selectedPriorityOption.trim()}`);

        cy.get('[data-testid="select:priority"]').click('bottomRight');

        cy.get('[data-testid="select-option"]')
          .each(($option) => {
            cy.wrap($option)
              .invoke('text')
              .then((text) => {
                priorityValues.push(text.trim());
                cy.log(`Added value: ${text.trim()}`);
                cy.log(`Current array length: ${priorityValues.length}`);
              });
          })
          .then(() => {
            expect(priorityValues.length).to.equal(expectedLength);

            const expectedValues = [
              'Lowest',
              'Low',
              'Medium',
              'High',
              'Highest',
            ];
            expect(priorityValues).to.have.members(expectedValues);
          });
      });
  });
});
