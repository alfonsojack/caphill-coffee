describe("Selected shop user flow", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001", {
      statusCode: 200,
      fixture: "coffeeShops",
    }).as("HomePage");
    cy.visit("http://localhost:3000");
  });

  it("should display a detailed selected shop page", () => {
    cy.intercept("GET", "http://localhost:3000/SelectedShop/1", {
      statusCode: 200,
      fixture: "selectedShop",
    }).as("SelectedShop");
    cy.wait("@HomePage").then((interception) => {
      cy.get(".App").get(".header").should("contain", "☕️Cap Hill Coffee☕️")
      cy.get(".card-container")
        .get(".card")
        .first()
        .contains("h3", "Dazbog Coffee")
        .get(".card")
        .first()
        .contains("h4", "Rating: 100%")
      cy.get('[href="/SelectedShop/1"] > .card > img')
        .should(
          "have.attr",
          "src",
          "https://lh3.googleusercontent.com/p/AF1QipMzYGEA6hJa3NAXnfJRN5dmXRK5QKMmNFQbOf7k=s1360-w1360-h1020"
        )
        .click();
          cy.get(".App").get(".header").should("contain", "☕️Cap Hill Coffee☕️")
          cy.get('.shop-img').should("have.attr", "src", "https://lh3.googleusercontent.com/p/AF1QipMzYGEA6hJa3NAXnfJRN5dmXRK5QKMmNFQbOf7k=s1360-w1360-h1020")
          .get('.shop-name').contains("h2", "Dazbog Coffee")
          .get('.shop-info-left-container > :nth-child(1)').contains("p", "Address: 1201 E 9th Ave, Denver, CO 80218")
          .get('.shop-info-left-container > :nth-child(2)').contains("p", "Phone number: 303-837-1275")
          .get('.shop-info-left-container > :nth-child(3)').contains("a", "https://dazbog.com")
          .get('.shop-info-right-container > div > :nth-child(1)').contains("Hours")
          .get('.shop-info-right-container > div').contains("p", "Monday: 6:00am - 4:00pm")
          .get('.shop-info-right-container > div').contains("p", "Tuesday: 6:00am - 4:00pm")
          .get('.shop-info-right-container > div').contains("p", "Wednesday: 6:00am - 4:00pm")
          .get('.shop-info-right-container > div').contains("p", "Thursday: 6:00am - 4:00pm")
          .get('.shop-info-right-container > div').contains("p", "Friday: 6:00am - 4:00pm")
          .get('.shop-info-right-container > div').contains("p", "Saturday: 7:00am - 5:00pm")
          .get('.shop-info-right-container > div').contains("p", "Sunday: 7:00am - 5:00pm")
          .get('.shop-info-right-container > :nth-child(2)').contains("p", "Dine In: true ")
        })
    });
  });
