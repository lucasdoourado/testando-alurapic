/// <reference types="Cypress" />

describe("login de usuarios", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("fazer login com usuario valido", () => {
    cy.login("flavio", "123");
    cy.contains("a", "(Logout)").should("be.visible");
  });

  it("fazer login com usuario invalido", () => {
    cy.login("lucas", "12345");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });
});
