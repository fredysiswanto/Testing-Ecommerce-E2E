describe('Test Case Login', () => {
  const userName = 'tester tester';
  const email = 'tester.tester@gmail.com';
  const password = 'asdfasdf';
  const timeWaiting = 3000;
  const baseURL = 'http://127.0.0.1:8000/';
  beforeEach(() => {
    // we will create a new alias before each test
    // cy.clearCookies();
    cy.visit('/');
  });
  it.only('login', () => {
    cy.get('[href="http://127.0.0.1:8000/login"]')
      .should('includes.text', 'Login')
      .click()
      .url()
      .should('includes', 'login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type=submit]')
      .contains('Sign in')
      .click()
      .url()
      .should('includes', baseURL);
    cy.get('nav').find('a:last-child').should('be.visible');
  });

  // it('register', () => {
  //   cy.get('[href="http://127.0.0.1:8000/register"]')
  //     .should('includes.text', 'Register')
  //     .click()
  //     .url()
  //     .should('includes', 'register');
  //   cy.get('#first_name').type(userName);
  //   cy.get('#last_name').type(userName);
  //   cy.get('#email').type(email);
  //   cy.get('#password').type(password);
  //   cy.get('#password_confirmation').type(password);
  //   cy.get('button[type=submit]')
  //     .contains('register')
  //     .click()
  //     .url()
  //     .should('includes', baseURL);
  // });
});
