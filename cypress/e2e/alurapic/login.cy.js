/// <reference types="Cypress" />

describe("login de usuarios", () => {
  beforeEach(() => {
    cy.visit("http://alura-fotos.herokuapp.com/");
  });

  it("fazer login com usuario valido", () => {
    cy.login(Cypress.env(userName), Cypress.env(password));
    cy.contains("a", "(Logout)").should("be.visible");
  });

  it("fazer login com usuario invalido", () => {
    cy.login("lucas", "12345");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });
});
