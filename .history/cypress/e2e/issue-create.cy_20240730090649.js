describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        // System will already open issue creating modal in beforeEach block
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  it("Should create an issue and validate it successfully", () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Type value to description input field
      cy.get(".ql-editor").type("TEST_DESCRIPTION");
      cy.get(".ql-editor").should("have.text", "TEST_DESCRIPTION");

      // Type value to title input field
      // Order of filling in the fields is first description, then title on purpose
      // Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type("TEST_TITLE");
      cy.get('input[name="title"]').should("have.value", "TEST_TITLE");

      // Open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="icon:story"]').should("be.visible");

      // Select Baby Yoda from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      // Select Baby Yoda from assignee dropdown
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      // Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    // Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    // Reload the page to be able to see recently created issue
    // Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    // Wait for Backlog list to be visible
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", 1);

    // Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", 1)
      .within(() => {
        // Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should("have.length", 5)
          .first()
          .find("p")
          .contains("TEST_TITLE")
          .siblings()
          .within(() => {
            //Assert that correct avatar and type icon are visible
            cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
            cy.get('[data-testid="icon:story"]').should("be.visible");
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains("TEST_TITLE")
      .within(() => {
        // Assert that correct avatar and type icon are visible
        cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
        cy.get('[data-testid="icon:story"]').should("be.visible");
      });
  });

  it("Should validate title is required field if missing", () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      // Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should(
        "contain",
        "This field is required"
      );
    });
  });

  const modalIssueCreate = "[data-testid='modal:issue-create']";
  const inputNameTitle = "input[name='title']";
  const textDescriptionEditor = ".ql-editor";
  const selectOptionBug = "[data-testid='select-option:Bug']";
  const bugIcon = "[data-testid='icon:bug']";
  const successMessage = "Issue has been successfully created.";
  const boardListBackLog = "[data-testid='board-list:backlog']";
  const listIssue = "[data-testid='list-issue']";
  const lordGabenAvatar = "[data-testid='avatar:Lord Gaben']";

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

  it.only("Should create a custom issue and validate it successfully", () => {
    cy.get(modalIssueCreate).within(() => {
      cy.get(textDescriptionEditor).type("My Bug description");
      cy.get(textDescriptionEditor).should("have.text", "My Bug description");
      cy.get(inputNameTitle).type("Bug");
      cy.get(inputNameTitle).should("have.value", "Bug");
      selectTypeDropdown();
      cy.get(selectOptionBug).wait(1000).trigger("mouseover").trigger("click");
      cy.get(bugIcon).should("be.visible");
      selectPriority();
      cy.get("[data-testid='select-option:Highest']")
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      selectingReporterDropdown();
      selectingAssigneeDropdown();
      cy.get('button[type="submit"]').click();
    });

    cy.get(modalIssueCreate).should("not.exist");
    cy.contains(successMessage).should("be.visible");
    cy.reload();
    cy.contains(successMessage).should("not.exist");

    cy.get(boardListBackLog)
      .should("be.visible")
      .and("have.length", 1)
      .within(() => {
        // Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get(listIssue)
          .should("have.length", 5)
          .first()
          .find("p")
          .contains("Bug")
          .siblings()
          .within(() => {
            cy.get(lordGabenAvatar).should("be.visible");
            cy.get(bugIcon).should("be.visible");
          });
      });
  });
});
