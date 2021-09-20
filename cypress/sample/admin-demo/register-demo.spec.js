context('Test Case Register', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8000/admin')
      .url()
      .should('include', 'admin/login');
    cy.get('a')
      .contains('Register')
      .click()
      .url()
      .should('include', 'admin/register');
  });

  it('register with all field empety', () => {
    cy.get('button')
      .contains('Register')
      .click()
      .url()
      .should('include', 'admin/register');
    cy.get('.invalid-feedback > strong').should('have.length', 3);
  });

  it('register with invalid data', () => {
    cy.get('input[id=name]').type('r');
    cy.get('input[id=email]').type('tester@tester1.com');
    cy.get('input[id=password]').type('admin123');
    cy.get('input[id=password_confirmation]').type('admin12');
    cy.get('button')
      .contains('Register')
      .click()
      .url()
      .should('include', 'admin/register');
    cy.get('#email')
      .should('have.class', 'is-invalid')
      .siblings('.invalid-feedback ')
      .contains('The email has already been taken.');
    cy.get('#password')
      .should('have.class', 'is-invalid')
      .siblings('.invalid-feedback ')
      .contains('The password confirmation does not match.');
  });

  it('register succes with valid data', () => {
    cy.task('clear:db');
    cy.get('input[id=name]').type('rester');
    cy.get('input[id=email]').type('tester@tester1.com');
    cy.get('input[id=password]').type('admin123');
    cy.get('input[id=password_confirmation]').type('admin123');
    cy.get('button')
      .contains('Register')
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
