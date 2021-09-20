describe('Home', () => {
  const baseURL = 'http://127.0.0.1:8000';

  beforeEach(() => {
    cy.setCookie('botble_cookie_newsletter', '1');
    cy.visit('/');
  });

  it('Top Categories', () => {
    cy.get('h2')
      .contains('Top Categories')
      .parent()
      .next()
      .should('include.text', 'Lorem ipsum');

    cy.get('.owl-stage').children().eq(0).should('have.class', 'active');
    cy.get('.owl-stage').children();
  });
});
