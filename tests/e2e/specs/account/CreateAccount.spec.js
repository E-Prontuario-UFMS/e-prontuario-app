describe("Should Test the Create Account module", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("should create an account successfully", () => {
    cy.visit("/");
    cy.get('[data-cy="btn-register"]').click();

    cy.get("[data-cy='passaporte']").type("ygor.azambuja");
    cy.get("[data-cy='senha']").type("ClashofGods");
    cy.get("[data-cy='btn-next']").click();

    cy.get("[data-cy='email']").type("ygorazambuja@gmail.com");
    cy.get("[data-cy='password']").type("Vemqda@2020");
    cy.get('[data-cy="confirmation-password"]').type("Vemqda@2020");
    cy.get("[data-cy='btn-next']").click();
    cy.wait(2000);
  });
});
