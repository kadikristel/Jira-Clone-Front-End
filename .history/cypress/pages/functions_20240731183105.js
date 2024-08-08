function selectTypeDropdown() {
  cy.get('[data-testid="select:type"]').click();
}

function selectPriority() {
  cy.get("[data-testid='select:priority']").click();
}

function selectingReporterBabyYodaDropdown() {
  cy.get('[data-testid="select:reporterId"]').click();
  cy.get().click();
}

function selectingReporterPickleRickDropdown() {
  cy.get('[data-testid="select:reporterId"]').click();
  cy.get().click();
}

function selectingAssigneePickleRickDropdown() {
  cy.get('[data-testid="form-field:userIds"]').click();
  cy.get().click();
}

function selectingAssigneeLordGabenDropdown() {
  cy.get('[data-testid="form-field:userIds"]').click();
  cy.get().click();
}

function clickingCreateIssueButton() {
  cy.get('button[type="submit"]').click();
}

export {
  selectTypeDropdown,
  selectPriority,
  selectingReporterBabyYodaDropdown,
  selectingReporterPickleRickDropdown,
  selectingAssigneePickleRickDropdown,
  selectingAssigneeLordGabenDropdown,
  clickingCreateIssueButton,
};
