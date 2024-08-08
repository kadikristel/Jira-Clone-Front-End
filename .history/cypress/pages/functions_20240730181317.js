function selectTypeDropdown() {
  cy.get('[data-testid="select:type"]').click();
}

function selectPriority() {
  cy.get("[data-testid='select:priority']").click();
}

function selectingReporterBabyYodaDropdown() {
  cy.get('[data-testid="select:reporterId"]').click();
  cy.get('[data-testid="select-option:Baby Yoda"]').click();
}

function selectingReporterPickleRick() {
  cy.get('[data-testid="select:reporterId"]').click();
  cy.get('[data-testid="select-option:Pickle Rick"]').click();
}

function selectingAssigneePickleRickDropdown() {
  cy.get('[data-testid="form-field:userIds"]').click();
  cy.get('[data-testid="select-option:Pickle Rick"]').click();
}

function selectingAssigneeLordGabenDropdown() {
  cy.get('[data-testid="form-field:userIds"]').click();
  cy.get('[data-testid="select-option:Lord Gaben"]').click();
}

function clickingCreateIssueButton() {
  cy.get('button[type="submit"]').click();
}

export {
  selectTypeDropdown,
  selectPriority,
  selectingReporterBabyYodaDropdown,
  selectingReporterPickleRick,
  selectingAssigneePickleRickDropdown,
  selectingAssigneeLordGabenDropdown,
  clickingCreateIssueButton,
};
