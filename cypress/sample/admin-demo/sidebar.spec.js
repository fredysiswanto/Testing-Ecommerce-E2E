describe('Test Case menu sidebar', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8000/admin');
    cy.get('input[id=email]')
      .type('admin@example.com')
      .should('have.value', 'admin@example.com');
    cy.get('input[id=password]').type('admin').should('have.value', 'admin');
    cy.get('button')
      .contains('Login')
      .click()
      .url()
      .should('include', 'admin/dashboard');
  });

  it('check menu', () => {
    cy.get('.sidebar');
  });
});
