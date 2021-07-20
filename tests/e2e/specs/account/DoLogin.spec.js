describe("Login e2e", () => {
  it("should not pass if user have a wrong password", () => {
    cy.visit("/");
    cy.get("[data-cy='email']").type("ygorazambuja@gmail.com");
    cy.get("[data-cy='password']").type("Vemqda@2");
    cy.get('[data-cy="btn-next"]').click();
  });
});
