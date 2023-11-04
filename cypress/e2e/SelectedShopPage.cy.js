describe("Selected shop user flow", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001", {
      statusCode: 200,
      fixture: "coffeeShops",
    }).as("shops");
    cy.visit("http://localhost:3000");
  });

  it("should display a detailed selected shop page", () => {
    cy.intercept("POST", "http://localhost:3001/SelectedShop/1", {
      statusCode: 201,
      fixture: "postRating",
    }).as("postRating");
    cy.wait("@shops").then((interception) => {
      cy.get(".header")
        .contains("h1", "☕️ Cap Hill Coffee ☕️")
        .get(".card-container")
        .get(".card")
        .first()
        .contains("h3", "Dazbog Coffee")
        .get(".card")
        .first()
        .contains("h4", "Rating: 100%")
        .get('[href="/SelectedShop/1"] > .card > img')
        .should(
          "have.attr",
          "src",
          "https://lh3.googleusercontent.com/p/AF1QipMzYGEA6hJa3NAXnfJRN5dmXRK5QKMmNFQbOf7k=s1360-w1360-h1020"
        )
        .click();
      cy.get(".header")
        .contains("h1", "☕️ Cap Hill Coffee ☕️")
        .get(".shop-img")
        .should(
          "have.attr",
          "src",
          "https://lh3.googleusercontent.com/p/AF1QipMzYGEA6hJa3NAXnfJRN5dmXRK5QKMmNFQbOf7k=s1360-w1360-h1020"
        )
        .get(".shop-name")
        .contains("h2", "Dazbog Coffee")
        .get(".home-button")
        .contains("a", "🏠")
        .get(".shop-info-left-container > :nth-child(1)")
        .contains("p", "Address: 1201 E 9th Ave, Denver, CO 80218")
        .get('ul > :nth-child(2)')
        .contains("p", "Phone number: 303-837-1275")
        .get('ul > :nth-child(3)')
        .contains("p", "Website")
        .get('ul > :nth-child(3)')
        .contains("a", "https://dazbog.com")
        .get('ul > :nth-child(4)')
        .contains("p", "Dine In: ✅")
        .get('ul > :nth-child(5)')
        .contains("p", "Take Out: ✅")
        .get('ul > :nth-child(6)')
        .contains("p", "Wheelchair Accessible: ✅")
        .get('ul > :nth-child(7)')
        .contains("p", "Food Provided: ✅")
        .get('ul > :nth-child(8)')
        .contains("p", "Contactless Pay: ❌")
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
        .get(".average > .outside")
        .contains("p", "Average Rating: 100%")
        .get(".rated-msg")
        .contains("p", "Rate this shop!")
        .get(":nth-child(1) > span")
        .contains("👍")
        .get(":nth-child(2) > span")
        .contains("👎")
        .click();
      cy.wait("@postRating").then((interception) => {
        cy.get(".rated-msg")
          .contains("You have already rated this shop, try another!")
          .get(".average > .outside")
          .contains("Average Rating: 67%");
      });
    });
  });
});
