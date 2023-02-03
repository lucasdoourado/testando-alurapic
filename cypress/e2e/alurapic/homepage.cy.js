/// <reference types="Cypress" />

describe("usabilidade tela inicial", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("verifica mensagem de tela inicial", () => {
    cy.contains("ap-vmessage", "User name is required!").should("be.visible");
    cy.contains("ap-vmessage", "Password is required!").should("be.visible");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("verifica botao habilitado na tela inicial", () => {
    cy.get('input[formcontrolname="userName"]').type("flavio");
    cy.get('input[formcontrolname="password"]').type("123");
    cy.get('button[type="submit"]').should("be.enabled");
  });

  it("verifica nome da aplicacao na tela inicial", () => {
    cy.contains("a", " ALURAPIC ").should("be.visible");
  });

  it("verifica menu clicavel na tela inicial", () => {
    cy.get(".navbar-brand > .fa").click();
    cy.get(".menu-bar > .fa").should("be.visible");
  });
});
