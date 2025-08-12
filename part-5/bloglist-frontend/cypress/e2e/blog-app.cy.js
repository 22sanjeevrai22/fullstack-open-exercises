describe("Blog app", function () {
  beforeEach(function () {
    //Skip the testing reset for now since backend might not be properly configured
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Sanjeev",
      username: "sanjeevblog",
      password: "sanjeevblog",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Add New Blog").click();
    // Wait for the form to be visible
    cy.get('input[name="username"]');
    cy.get('input[name="password"]');
    cy.get("button").contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Add New Blog").click();
      cy.get('input[name="username"]').type("sanjeevblog");
      cy.get('input[name="password"]').type("sanjeevblog");
      cy.get("button").contains("Login").click();

      cy.contains("Logout");
      cy.contains("Create New Blog");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Add New Blog").click();
      cy.get('input[name="username"]').type("sanjeevblog2");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.get("button").contains("Login").click();

      cy.get(".notification.error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(170, 0, 0)");

      // Verify user is not logged in - logout button should not exist
      cy.contains("Logout").should("not.exist");
    });
  });
});
