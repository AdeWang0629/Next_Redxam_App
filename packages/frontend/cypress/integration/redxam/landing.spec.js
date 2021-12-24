/// <reference types="cypress" />

const EMAILS = "jhon.ocampo123@gmail.com";

context("Landing Page", () => {
  it("Is Waitlist Joinable?", () => {
    cy.visit("http://localhost:3000");
    cy.get("#join-waiting").click({ force: true });
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#email").type(EMAILS);
    cy.get("#join-waiting-button").click();
    cy.get("#waitlist-model").should("not.exist");
  });

  it("Checks if all links are working", () => {
    cy.visit("/");
    cy.get(
      "a[href]:not([href*='mailto:']):not([href*='tel:']):not([href*='https://linkedin.com/'])"
    ).each((page) => {
      cy.request(page.prop("href"));
    });
  });
}); 