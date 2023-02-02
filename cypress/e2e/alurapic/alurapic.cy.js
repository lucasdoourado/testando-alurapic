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

  it("verifica mensagem de email invalido", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="email"]').type("lucas");
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("verifica mensagem de senha invalida", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="password"]').type("123");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
    cy.get('input[formcontrolname="password"]').type("01234567890123456789");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Maximun length is 18").should("be.visible");
  });
});
