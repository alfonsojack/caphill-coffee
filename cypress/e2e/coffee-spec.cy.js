describe('caphill coffee shops', () => {
  beforeEach(() => {
    cy.intercept('GET','http://localhost:3001', {
      statusCode: 200,
      fixture: "coffeeShops",
    }).as("shops")
    cy.visit('http://localhost:3000').wait('@shops');
  });

  it('shows coffee shop cards on load', () => {
    cy.get(".App").get(".header").should("contain", "☕️Cap Hill Coffee☕️");
    cy.get(".card-container").get('.card').first().should("contain", "Dazbog Coffee");
    cy.get('img[alt="Dazbog Coffee image"]').should('have.attr', 'src', "https://lh3.googleusercontent.com/p/AF1QipMzYGEA6hJa3NAXnfJRN5dmXRK5QKMmNFQbOf7k=s1360-w1360-h1020");
    cy.get('h4', )
    cy.get(".card-container").get('.card').last().should("contain", "Pablos Coffee");
    cy.get('img[alt="Pablos Coffee image"]').should('have.attr', 'src', "https://example.com/path-to-image.jpg"); //change to real path
  })
})