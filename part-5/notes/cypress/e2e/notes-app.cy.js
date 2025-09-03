/* global describe, beforeEach, it, cy, Cypress */
describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Sasuke Uchiha",
      username: "sasukeuchiha",
      password: "sasukeuchiha",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.visit("");
    cy.contains("Notes");
    cy.contains("Department of Listen My Son");
  });

  it("front page contains random text", function () {
    cy.visit("");
    cy.contains("Note app, Department of Listen My Son, TEJ Fellowship");
  });

  it("login form can be opened", function () {
    cy.visit("");
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("sasukeuchiha");
    cy.get("#password").type("sasukeuchiha");
    cy.get("#login-button").click();

    cy.contains("Sasuke Uchiha logged-in");
  });

  // it.only("login fails with wrong password", function () {
  //   cy.contains("login").click();
  //   cy.get("#username").type("sasukeuchiha");
  //   cy.get("#password").type("wrong");
  //   cy.get("#login-button").click();

  //   cy.get(".error")
  //     .should("contain", "wrong credentials")
  //     .and("have.css", "color", "rgb(255, 0, 0)")
  //     .and("have.css", "border-style", "solid");

  //   cy.get("html").should("not.contain", "Sasuke Uchiha logged-in");
  //   // cy.contains('Sasuke Uchiha logged-in').should('not.exist')//same same
  // });

  describe("when logged in", function () {
    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.login({ username: "sasukeuchiha", password: "sasukeuchiha" });
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
        cy.visit("http://localhost:5173"); // Refresh UI to see the notes
      });

      it("one of those can be made important", function () {
        cy.contains("second note")
          .parent()
          .contains("button", "make important")
          .click();

        cy.contains("second note")
          .parent()
          .contains("button", "make not important");
      });
    });

    it("a new note can be created", function () {
      cy.login({ username: "sasukeuchiha", password: "sasukeuchiha" });
      cy.createNote({
        content: "another note cypress",
        important: true,
      });
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.login({ username: "sasukeuchiha", password: "sasukeuchiha" });
        cy.contains("new note").click();
        cy.get("#note-input").type("another note created by cypress");
        cy.contains("save").click();
      });

      it("it can be made not important", function () {
        cy.contains("li.note-item", "another note created by cypress")
          .contains("make not important")
          .click();

        cy.contains("li.note-item", "another note created by cypress").contains(
          "make important"
        );
      });
    });
  });
});
