describe('Caphill Coffee shop error handling', () => {

  it('Displays an error message for a 500 response', () => {
    cy.intercept("GET", "http://localhost:3001", {
      statusCode: 500,
      fixture: "coffeeShops",
    }).as("shops");
    cy.visit("http://localhost:3000");
    cy.get('.error-cont').get(".error-h2").should("contain", "ERROR");
    cy.get('.error-h3-error').should("contain", "_Error_Error__WEBPACK_IMPORTED_MODULE_1__.default is not a constructor");
    cy.get('.error-h3-msg').should("contain", "Something's wrong on our end. Please come back later.");
    cy.visit("http://localhost:3000/SelectedShop/1");
    cy.get('.error-cont').get(".error-h2").should("contain", "ERROR");
    cy.get('.error-h3-error').should("contain", "_Error_Error__WEBPACK_IMPORTED_MODULE_1__.default is not a constructor");
    cy.get('.error-h3-msg').should("contain", "Something's wrong on our end. Please come back later.");
  });

  it('Displays an error message for a 400 level/bad route response', () => {
    cy.intercept("GET", "http://localhost:3001", {
      statusCode: 200,
      fixture: "coffeeShops"
    }).as("shops");
    cy.visit("http://localhost:3000/hjdtyh");
    cy.get('.error-cont').get(".error-h2").should("contain", "ERROR");
    cy.get('.error-h3-msg').should("contain", "You've gone down the wrong path. Click home to retrack your steps");
    cy.visit("http://localhost:3000/SelectedShop/hgfdh");
    cy.get('.error-cont').get(".error-h2").should("contain", "ERROR");
    cy.get('.error-h3-error').should("contain", "Cannot read properties of undefined (reading 'rating')");
    cy.get('.error-h3-msg').should("contain", "Something's wrong. Click home to try again.");
    cy.get('.error-home-button').click().url().should("include", "/");
    cy.get(".App").get(".header").should("contain", "☕️    Cap Hill Coffee    ☕️");
    cy.get(".card-container").get(".card").should("have.length", 3);
  });
})