/* global Cypress */
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

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/auth/login`, {
    username,
    password,
  }).then(({ body }) => {
    console.log("user in command js before setting", body);
    localStorage.setItem("noteUserInfo", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

Cypress.Commands.add("createNote", ({ content, important }) => {
  cy.window().then((win) => {
    const getUserInfo = () => {
      const userRaw = win.localStorage.getItem("noteUserInfo");
      if (!userRaw) {
        throw new Error("noteUserInfo not found in localStorage yet");
      }
      return JSON.parse(userRaw);
    };

    const user = getUserInfo(); // may throw if null
    console.log("user in command.js after getting", user.token);

    cy.request({
      method: "POST",
      url: `${Cypress.env("BACKEND")}/notes`,
      body: { content, important },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  });

  cy.visit("");
});
