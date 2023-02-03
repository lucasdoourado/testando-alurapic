/// <reference types="Cypress" />

describe("cadastro de usuarios", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("verifica mensagens de validacao no cadastro", () => {
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
    cy.get('input[formcontrolname="email"]').type("lucas email");
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("verifica mensagem de senha invalida no cadastro", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="password"]').type("1234567");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
    cy.get('input[formcontrolname="password"]').type("01234567890123456789");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Maximun length is 18").should("be.visible");
  });

  it("verifica mensagem de nome completo invalido no cadastro", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="fullName"]').type("a");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 2").should("be.visible");
    cy.get('input[formcontrolname="fullName"]').type(
      "uhdauhdauhdasuhdausdhasuhdasudhausdhuasha"
    );
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Maximun length is 40").should("be.visible");
  });

  it("verifica mensagem de nome de usuario invalido no cadastro", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="userName"]').type("a");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 2").should("be.visible");
    cy.get('input[formcontrolname="userName"]').type(
      "asdysgdasygdyasgdasygdasygdygyg"
    );
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Maximun length is 30").should("be.visible");
    cy.get('input[formcontrolname="userName"]').clear().type("USUARIO");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Must be lower case").should("be.visible");
  });

  it("fazer cadastro de usuario ja existente", () => {
    cy.registra("skruug@outlook.com", "Lucas Dourado", "skruug", "12345678");
    cy.contains("ap-vmessage", "Username already taken").should("be.visible");
  });

  const usuarios = require("../../fixtures/usuarios.json");
  usuarios.forEach((usuario) => {
    it(`fazer cadastro de usuario ${usuario.userName}`, () => {
      cy.registra(
        usuario.email,
        usuario.fullName,
        usuario.userName,
        usuario.password
      );
      cy.contains("button", "login").should("be.visible");
    });
  });
});
