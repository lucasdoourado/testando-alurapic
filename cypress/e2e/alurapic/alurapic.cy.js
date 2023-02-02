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
    cy.get('input[formcontrolname="email"]').type("lucas email");
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("verifica mensagem de senha invalida", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="password"]').type("1234567");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
    cy.get('input[formcontrolname="password"]').type("01234567890123456789");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Maximun length is 18").should("be.visible");
  });

  it("verifica mensagem de nome completo invalida", () => {
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

  it("verifica mensagem de nome de usuario invalida", () => {
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

  const usuarios = require("../../fixtures/usuarios.json");
  usuarios.forEach((usuario) => {
    it.only(`fazer registro de usuario ${usuario.userName}`, () => {
      cy.registra(
        usuario.email,
        usuario.fullName,
        usuario.userName,
        usuario.password
      );
      cy.contains("button", "login").should("be.visible");
    });
  });

  it("fazer registro de usuario que ja existe", () => {
    cy.registra("skruug@outlook.com", "Lucas Dourado", "skruug", "12345678");
    cy.contains("ap-vmessage", "Username already taken").should("be.visible");
  });
});
