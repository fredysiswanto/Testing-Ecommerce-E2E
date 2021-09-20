describe('Login', () => {
  const userName = 'tester tester';
  const email = 'user@tester.com';
  const password = 'asdfasdf';
  const timeWaiting = 10000;
  const baseURL = 'http://127.0.0.1:8000/';
  beforeEach(() => {
    // we will create a new alias before each test
    // cy.clearCookies();
    cy.visit('/');
    cy.setCookie('botble_cookie_newsletter', '1');
    cy.get('[href="http://127.0.0.1:8000/login"]')
      .should('includes.text', 'Login')
      .click()
      .url()
      .should('includes', 'login');
  });

  it('login with empety input', () => {
    // cy.get('[href="http://127.0.0.1:8000/login"]')
    //   .should('includes.text', 'Login')
    //   .click()
    //   .url()
    //   .should('includes', 'login');
    // cy.get('#txt-email').type(email);
    // cy.get('#txt-password').type(password);
    cy.get('button[type=submit]').contains('Log in').click();
    cy.get('#alert-container')
      .children()
      .should('have.length.gt', 0)
      .each(($err) => {
        const errrors = $err.text();
        expect(errrors).to.include('required');
      });
    cy.get('.text-danger').each(($err) => {
      const errrors = $err.text();
      expect(errrors).to.include('required');
    });
  });
  // close popup newletter
  // cy.get('.ion-ios-close-empty')
  //   .wait(timeWaiting)
  //   .click()
  //   .parentsUntil('#newsletter-modal')
  //   .should('not.have.class', 'show');
  // cy.get('h1');

  it('login with invalid data', () => {
    cy.get('#txt-email').type(email);
    cy.get('#txt-password').type('aaaa');
    cy.get('button[type=submit]').contains('Log in').click();
    cy.get('#alert-container')
      .children()
      .should('have.length.gt', 0)
      .each(($err) => {
        const errrors = $err.text();
        expect(errrors).to.include('redentials do not match');
      });
    cy.get('.text-danger').each(($err) => {
      const errrors = $err.text();
      expect(errrors).to.include('redentials do not match');
    });
  });

  it('login with valid data', () => {
    cy.get('#txt-email').type(email);
    cy.get('#txt-password').type(password);
    cy.get('button[type=submit]').contains('Log in').click();
    cy.get('.header_list>li:last-child')
      .should('have.text', 'Logout')
      .prev()
      .children()
      .should('have.attr', 'href', 'http://127.0.0.1:8000/customer/overview');
  });
});
