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
});
