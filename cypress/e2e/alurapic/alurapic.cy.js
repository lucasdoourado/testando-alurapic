/// <reference types="Cypress" />

describe("Login e registro de usuarios alura pic", () => {
  beforeEach(() => {
    cy.visit("http://alura-fotos.herokuapp.com/");
  });
  it("verifica mensagens de validacao no registro", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Email is required!").should("be.visible");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Full name is required!").should("be.visible");
    cy.contains("ap-vmessage", "User name is required!").should("be.visible");
    cy.contains("ap-vmessage", "Password is required!").should("be.visible");
  });
});
