function selectTypeDropdown() {
  cy.get('[data-testid="select:type"]').click();
}

function selectPriority() {
  cy.get("[data-testid='select:priority']").click();
}

function selectingReporterDropdown() {
  cy.get('[data-testid="select:reporterId"]').click();
  cy.get('[data-testid="select-option:Pickle Rick"]').click();
}

function selectingAssigneeDropdown() {
  cy.get('[data-testid="form-field:userIds"]').click();
  cy.get('[data-testid="select-option:Lord Gaben"]').click();
}

export {
  selectTypeDropdown,
  selectPriority,
  selectingReporterDropdown,
  selectingAssigneeDropdown,
};
