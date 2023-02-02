/// <reference types="Cypress" />

describe("Buscar fotos e dados", () => {
  it("Buscar fotos do Flávio", () => {
    cy.request({
      method: "GET",
      url: "https://apialurapic.herokuapp.com/flavio/photos",
    }).then((resposta) => {
      expect(resposta.status).to.be.equal(200);
      expect(resposta.body).is.not.empty;
      expect(resposta.body[0]).to.have.property("description");
      expect(resposta.body[0].description).to.be.equal("Farol iluminado");
    });
  });

  it("fazer login do Flávio", () => {
    cy.request({
      method: "POST",
      url: "https://apialurapic.herokuapp.com/user/login",
      body: Cypress.env(),
    }).then((resposta) => {
      expect(resposta.status).to.be.equal(200);
      expect(resposta.body).is.not.empty;
      expect(resposta.body).to.have.property("name");
      expect(resposta.body.name).to.be.equal("flavio");
      expect(resposta.body).to.have.property("id");
      expect(resposta.body.id).to.be.equal(1);
      expect(resposta.body).to.have.property("email");
      expect(resposta.body.email).to.be.equal("flavio@alurapic.com.br");
    });
  });
});
