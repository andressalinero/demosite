/// <reference types="cypress" />

describe("Login", () => {
    beforeEach(() => {
      cy.fixture("users.json").as("mockedUsers");
    });
  
    it("Can login through the UI", function () {
      cy.visit("http://localhost:8000/accounts/login");
      cy.get("input[name='username']").type(this.mockedUsers[0].username);
      cy.get("input[name='password']").type(this.mockedUsers[0].password);
      cy.get("form").submit();
      cy.getCookie("sessionid").should("exist");
    });

    it("Can block login through the UI", function () {
        cy.visit("http://localhost:8000/accounts/login");
        cy.get("input[name='username']").type(this.mockedUsers[1].username);
        cy.get("input[name='password']").type(this.mockedUsers[1].password);
        cy.get("form").submit();
        cy.getCookie("sessionid").should("not.exist");
      });
  });