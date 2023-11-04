describe("Selected shop user flow", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001", {
      statusCode: 200,
      fixture: "coffeeShops",
    }).as("selectedShop");
    cy.visit("http://localhost:3000");
  });

  it("should display a detailed selected shop page", () => {
    cy.intercept("POST", "http://localhost:3001/SelectedShop/1", {
      statusCode: 201,
      fixture: "selectedShop",
    }).as("postRating");
    cy.wait("@selectedShop").then((interception) => {
      cy.get(".App").get(".header").should("contain", "☕️Cap Hill Coffee☕️");
      cy.get(".card-container")
        .get(".card")
        .first()
        .contains("h3", "Dazbog Coffee")
        .get(".card")
        .first()
        .contains("h4", "Rating: 100%");
      cy.get('[href="/SelectedShop/1"] > .card > img')
        .should(
          "have.attr",
          "src",
          "https://lh3.googleusercontent.com/p/AF1QipMzYGEA6hJa3NAXnfJRN5dmXRK5QKMmNFQbOf7k=s1360-w1360-h1020"
        )
        .click();
      cy.get(".App").get(".header").should("contain", "☕️Cap Hill Coffee☕️");
      cy.get(".shop-img")
        .should(
          "have.attr",
          "src",
          "https://lh3.googleusercontent.com/p/AF1QipMzYGEA6hJa3NAXnfJRN5dmXRK5QKMmNFQbOf7k=s1360-w1360-h1020"
        )
        .get(".shop-name")
        .contains("h2", "Dazbog Coffee")
        .get(".shop-info-left-container > :nth-child(1)")
        .contains("p", "Address: 1201 E 9th Ave, Denver, CO 80218")
        .get(".shop-info-left-container > :nth-child(2)")
        .contains("p", "Phone number: 303-837-1275")
        .get(".shop-info-left-container > :nth-child(3)")
        .contains("a", "https://dazbog.com")
        .get(".shop-info-right-container > div > :nth-child(1)")
        .contains("Hours")
        .get(".shop-info-right-container > div")
        .contains("p", "Monday: 6:00am - 4:00pm")
        .get(".shop-info-right-container > div")
        .contains("p", "Tuesday: 6:00am - 4:00pm")
        .get(".shop-info-right-container > div")
        .contains("p", "Wednesday: 6:00am - 4:00pm")
        .get(".shop-info-right-container > div")
        .contains("p", "Thursday: 6:00am - 4:00pm")
        .get(".shop-info-right-container > div")
        .contains("p", "Friday: 6:00am - 4:00pm")
        .get(".shop-info-right-container > div")
        .contains("p", "Saturday: 7:00am - 5:00pm")
        .get(".shop-info-right-container > div")
        .contains("p", "Sunday: 7:00am - 5:00pm")
        .get(".shop-info-right-container > :nth-child(2)")
        .contains("p", "Dine In: ✅")
        .get(".shop-info-right-container > :nth-child(3)")
        .contains("p", "Take Out: ✅")
        .get(".shop-info-right-container > :nth-child(4)")
        .contains("p", "Wheelchair Accessible: ✅")
        .get(".shop-info-right-container > :nth-child(5)")
        .contains("p", "Food Provided: ✅")
        .get(".shop-info-right-container > :nth-child(6)")
        .contains("p", "Contactless Pay: ❌")
        .get(".average > p")
        .contains("p", "Average Rating: 100%")
        .get(".unrated-msg")
        .contains("p", "Rate this shop!");

      cy.get(":nth-child(2) > span")
        .contains("👍")
        .get(":nth-child(3) > span")
        .contains("👎")
        .click();
      cy.wait("@postRating").then((interception) => {
        cy.get(".rated-msg")
          .contains("You have already rated this shop, try another!")
          .get(".average > p")
          .contains("p", "Average Rating: 100%");
      });
    });
  });
});
