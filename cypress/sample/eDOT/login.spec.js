describe('Test Login', () => {
  it('check Base Url', () => {
    cy.visit('https://edot.id/login').url().should('include', '/login');
    cy.get('#login_username')
      .type('tester.fredy@gmail.com')
      .should('have.value', 'tester.fredy@gmail.com');
    cy.get('#login_password').type('batam123').should('have.value', 'batam123');
    cy.get('.button')
      .contains('Masuk')
      .click()
      .url()
      .should('include', 'edot.id/home-eShop');

    cy.get('.Toastify__toast', {
      timeout: 5000,
    }).contains('Login Berhasil');
    cy.get('.HomePromoBanner_btnClose__2urIJ > .icon > svg').click();
    cy.contains('Akun', {
      timeout: 10000,
    })
      .click()
      .url()
      .should('include', 'edot.id/profile');

    // cy.contains('Keluar').click().should('include', 'edot.id/login');
  });
});
