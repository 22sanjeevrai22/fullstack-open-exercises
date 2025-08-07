describe("Blog app", function () {
  beforeEach(function () {
    // Clear localStorage to ensure no user is logged in, this is optional
    // cy.clearLocalStorage();
    cy.visit("http://localhost:5173");

    // Wait for the app to fully load and check localStorage
    cy.wait(1000);
  });

  it("Login form is shown", function () {
    cy.contains("Add New Blog").click();

    cy.get('input[name="username"]').type("sanjeevblog");
    cy.get('input[name="password"]').type("sanjeevblog");
    cy.get("button").contains("Login").click();
  });
});
