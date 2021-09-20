describe('Test Case Login', () => {
  it('check Base Url', () => {
    cy.visit('http://127.0.0.1:8000/admin')
      .url()
      .should('include', 'admin/login');
  });

  it('check login error with no input', () => {
    cy.visit('http://127.0.0.1:8000/admin');
    cy.get('button')
      .contains('Login')
      .click()
      .url()
      .should('include', 'admin/login');
    cy.get('[class=invalid-feedback]').contains('The email field is required.');
    cy.get('[class=invalid-feedback]').contains(
      'The password field is required.'
    );
  });

  it('check login with invalid email', () => {
    cy.visit('http://127.0.0.1:8000/admin');
    cy.get('input[id=email]')
      .type('admin@example.com')
      .should('have.value', 'admin@example.com');
    cy.get('input[id=password]').type('admin1').should('have.value', 'admin1');

    cy.get('button')
      .contains('Login')
      .click()
      .url()
      .should('include', 'admin/login');
    cy.get('[class=invalid-feedback]').contains(
      'These credentials do not match our records.'
    );
  });

  it('check login with invalid password', () => {
    cy.visit('http://127.0.0.1:8000/admin');
    cy.get('input[id=email]')
      .type('admin@example1.com')
      .should('have.value', 'admin@example1.com');
    cy.get('input[id=password]').type('admin').should('have.value', 'admin');

    cy.get('button')
      .contains('Login')
      .click()
      .url()
      .should('include', 'admin/login');
    cy.get('[class=invalid-feedback]').contains(
      'These credentials do not match our records.'
    );

    it('check login pass and logout', () => {
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

      cy.get('img').should('have.class', 'img-avatar').click();
      cy.get('a[class=dropdown-item]')
        .last()
        .click()
        .url()
        .should('include', 'admin/login');
    });
  });
});
