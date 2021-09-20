describe('Register', () => {
  const userName = 'user tester';
  const email = 'user@tester.com';
  const password = 'asdfasdf';
  const timeWaiting = 3000;
  const baseURL = 'http://127.0.0.1:8000/';
  beforeEach(() => {
    // we will create a new alias before each test
    cy.clearCookies();
    cy.visit('https://www.youtube.com/');
  });

  it('find my chanel', () => {
    cy.get('#search').type('kubaca in{enter}');
    cy.contains('Testing website ecommerce').wait(timeWaiting).click();
    cy.get('.ytp-play-button').parent().click().wait(100000);
  });
});
