describe("caphill coffee shops", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001", {
      statusCode: 200,
      fixture: "coffeeShops",
    }).as("shops");
    cy.visit("http://localhost:3000").wait("@shops");
  });

  it("shows coffee shop cards on load, and can navigate shop", () => {
    cy.get(".App").get(".header").should("contain", "☕️    Cap Hill Coffee    ☕️");
    cy.get(".card-container").get(".card").should("have.length", 3);
    cy.get(".card-container").first().should("contain", "Dazbog Coffee");
    cy.get('img[alt="Dazbog Coffee image"]').should(
      "have.attr",
      "src",
      "https://lh3.googleusercontent.com/p/AF1QipMzYGEA6hJa3NAXnfJRN5dmXRK5QKMmNFQbOf7k=s1360-w1360-h1020"
    );
    cy.get('[href="/SelectedShop/1"] > .card > .card-rating').contains(
      "h4",
      "Rating: 100%"
    );
    cy.get(".card-container").last().should("contain", "Pablos Coffee");
    cy.get('img[alt="Pablos Coffee image"]').should(
      "have.attr",
      "src",
      "https://lh3.googleusercontent.com/p/AF1QipPb-7--lSkbxVIzioimmGN_bU2KZZrq5EpBw2-f=s1360-w1360-h1020"
    );
    cy.get('[href="/SelectedShop/3"] > .card > .card-rating').contains(
      "h4",
      "Rating: 25%"
    );
    cy.get('[href="/SelectedShop/3"] > .card').click();
    cy.url().should("include", "SelectedShop/3");
    cy.get(".shop-name").should("contain", "Pablos Coffee");
    // nicole's tests for content of selected shop
    // assert that on mount the rating <p> says rate this shop!
    // click on rating, assert that <p> text changed accordingly
    // click home button and assert url to home route
  });
});
