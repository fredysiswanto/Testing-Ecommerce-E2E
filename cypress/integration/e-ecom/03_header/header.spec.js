describe('Header', () => {
  const baseURL = 'http://127.0.0.1:8000';

  beforeEach(() => {
    cy.setCookie('botble_cookie_newsletter', '1');
    cy.visit('/');
    cy.get('.choose-currency').children().as('currency');
  });

  it('currency active fisrt load', () => {
    cy.get('@currency')
      .eq(1)
      .should('have.class', 'active')
      .should('have.text', 'USD');
    cy.contains('$').should('have.class', 'price');
  });

  it('swith currency to EUR', () => {
    cy.get('.choose-currency').children().eq(2).click();
    cy.get('@currency')
      .eq(2)
      .should('have.text', 'EUR')
      .should('have.class', 'active');
    cy.contains('€').should('have.class', 'price');
  });

  it('swith currency to VND', () => {
    cy.get('.choose-currency').children().eq(3).click();
    cy.get('@currency')
      .eq(3)
      .should('have.text', 'VND')
      .should('have.class', 'active');
    cy.contains('₫').should('have.class', 'price');
  });

  it('compare product', () => {
    cy.get('.header_list')
      .contains('Compare')
      .should('have.attr', 'href', `${baseURL}/compare`)
      .click();
    cy.url().should('includes', `${baseURL}/compare`);
  });

  it('Login', () => {
    cy.get('.header_list')
      .contains('Login')
      .should('have.attr', 'href', `${baseURL}/login`)
      .click();
    cy.url().should('includes', `${baseURL}/login`);
  });

  it('logo brand', () => {
    cy.get('.nav_block > .navbar-brand')
      .should('have.attr', 'href', `${baseURL}`)
      .click();
    cy.url().should('includes', `${baseURL}`);
  });

  it('search product', () => {
    cy.get('.input-group').within(($input) => {
      cy.get('select').select('2');
      cy.get('input[name="q"]').type('women');
      cy.get('button[type="submit"]').click();
    });
    cy.get('h1').should('include.text', 'women');
    cy.get('.widget > .widget_categories')
      .children()
      .contains('Mobile')
      .parent()
      .should('have.class', 'active');
  });
});
