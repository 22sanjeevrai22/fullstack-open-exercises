describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.visit("http://localhost:5173");
    cy.contains("Notes");
    cy.contains("Your awesome note:");
  });

  it("front page contains random text", function () {
    cy.visit("http://localhost:5173");
    cy.contains("Note app, Department of Listen My Son, TEJ Fellowship");
  });

  it("login form can be opened", function () {
    cy.visit("http://localhost:5173");
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("Sanjeev_Rai_Test");
    cy.get("#password").type("sanjeevraitest");
    cy.get("#login-button").click();

    cy.contains("Sanjeev Rai Test logged-in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("Sanjeev_Rai_Test");
      cy.get("#password").type("sanjeevraitest");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });
  });
});
