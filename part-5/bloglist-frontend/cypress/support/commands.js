// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to open login form
Cypress.Commands.add("openLoginForm", () => {
  cy.get("button").contains("Add New Blog").should("be.visible").click();
  // Wait for form to be visible
  cy.wait(1000);
  cy.get('input[name="username"]').should("be.visible");
  cy.get('input[name="password"]').should("be.visible");
  cy.get("button").contains("Login").should("be.visible");
});

// Custom command to login
Cypress.Commands.add("login", ({ username, password }) => {
  cy.openLoginForm();
  cy.get('input[name="username"]').should("be.visible").type(username);
  cy.get('input[name="password"]').should("be.visible").type(password);
  cy.get("button").contains("Login").should("be.visible").click();
});
