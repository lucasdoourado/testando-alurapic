/// <reference types="Cypress" />

Cypress.Commands.add("login", (userName, password) => {
  cy.get('input[formcontrolname="userName"]').type(userName);
  cy.get('input[formcontrolname="password"]').type(password, { log: false });
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("registra", (email, fullName, userName, password) => {
  cy.contains("a", "Register now").click();
  cy.contains("button", "Register").click();
  cy.get('input[placeholder="email"]').type(email);
  cy.get('input[placeholder="full name"]').type(fullName);
  cy.get('input[placeholder="user name"]').type(userName);
  cy.get('input[placeholder="password"]').type(password);
  cy.contains("button", "Register").wait(1000).click();
});
