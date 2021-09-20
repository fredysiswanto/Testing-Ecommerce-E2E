describe('Register', () => {
  const userName = 'user tester';
  const email = 'user@tester.com';
  const password = 'asdfasdf';
  const timeWaiting = 5000;
  const baseURL = 'http://127.0.0.1:8000/';
  beforeEach(() => {
    // we will create a new alias before each test
    cy.task(
      'queryDb',
      'DELETE FROM ec_customers WHERE name = "user tester"'
    ).log('remove user with name [user tester]');
    cy.setCookie('botble_cookie_newsletter', '1');
  });
  it('Register with valid data', () => {
    cy.visit('http://127.0.0.1:8000/register');
    cy.get('#txt-name').type(userName);
    cy.get('#txt-email').type(email);
    cy.get('#txt-password').type(password);
    cy.get('#txt-password-confirmation').type(password);
    cy.get('#terms-policy').check({ force: true });
    cy.get('button[type=submit]')
      .contains('Sign up')
      .click()
      .url()
      .should('eq', baseURL);
    cy.get('#alert-container')
      .should('have.length.gt', 0)
      .children()
      .should('have.class', 'alert-success');
    // close popup newletter
    // cy.get('.ion-ios-close-empty')
    //   .wait(timeWaiting)
    //   .click()
    //   .parentsUntil('#newsletter-modal')
    //   .should('not.have.class', 'show');
  });
});
