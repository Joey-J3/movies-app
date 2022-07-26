import { getTestElement } from "../utils";

describe("movie operation", () => {
  before(() => {
    cy.viewport(1280, 800);
    cy.visit("localhost:8080");
  });
  it("add movie", () => {
    cy.intercept({
      method: "POST",
      url: "/api/movies",
    }).as("postNewMovie");
    getTestElement("add-movie-button").click();
    // select form
    getTestElement("movie-modal-form").within(($form) => {
      // input title
      cy.get("#title").type("test");
      // input release date
      cy.get("#release_date").type("2022-07-18");
      // input poster path
      cy.get("#poster_path").type(
        "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg"
      );
      // input vote average
      cy.get("#vote_average").type("7.2");
      // open genres drop-down
      const dropdown = cy.get(`[data-testid="${"drop-down"}"]`);
      dropdown.click();
      // select genres
      dropdown
        .get(`[data-testid="${"drop-down-list"}"]`)
        .get("li")
        .should("have.length.at.least", 1)
        .first()
        .click();
      // close drop-down
      cy.get(`[data-testid="${"drop-down"}"]`).click();
      // input runtime
      cy.get("#runtime").type("121");
      // input overview
      cy.get("#overview").type("overview testing");
      // submit form
      cy.get("button[type=submit]").click();
      cy.wait("@postNewMovie").then((interception) => {
        const data = interception.response?.body;
        expect(data.title).to.eq("test");
      });
    });
  });
});
