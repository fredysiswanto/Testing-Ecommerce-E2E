describe('Test Case Login', () => {
  const userName = 'tester tester';
  const email = 'tester.tester@gmail.com';
  const password = 'asdfasdf';
  const timeWaiting = 3000;
  const baseURL = 'http://127.0.0.1:8000/';
  beforeEach(() => {
    // we will create a new alias before each test
    // cy.clearCookies();
    // cy.visit('/');
  });
  // it('login', () => {
  //   cy.get('[href="http://127.0.0.1:8000/login"]')
  //     .should('includes.text', 'Login')
  //     .click()
  //     .url()
  //     .should('includes', 'login');
  //   cy.get('#email').type(email);
  //   cy.get('#password').type(password);
  //   cy.get('button[type=submit]')
  //     .contains('Sign in')
  //     .click()
  //     .url()
  //     .should('includes', baseURL);
  //   cy.get('nav').find('a:last-child').should('be.visible');
  // });

  it('cart', () => {
    cy.login(email, password);
    cy.get('[action="http://127.0.0.1:8000/add-to-cart"]').eq(0).click();

    cy.contains('Product added to cart successfully').should('be.visible');
    cy.get('[href="http://127.0.0.1:8000/cart"]').click();
    cy.get('table>tbody>tr').should('length.gt', 0);
    cy.contains('div', 'Sub Total', { matchCase: true })
      .next()
      .should('not.have.value', '$0.00');
    cy.get(':nth-child(4) > .text-lg')
      .should('includes.text', 'Total')
      .next()
      .should('not.have.value', '$0.00');

    cy.get('a > .flex').click().url().should('includes', 'checkout');
  });

  it('checkout', () => {
    // cy.get('[href="http://127.0.0.1:8000/checkout"]').click();
    cy.get('#shipping\\[first_name\\]').type('nama depan');
    cy.get('#shipping\\[last_name\\]').type('nama belakang');
    cy.get('#shipping\\[company_name\\]').type('perusahaan');
    cy.get('#shipping\\[phone\\]').type(6281117777);
    cy.get('#shipping\\[address1\\]').type('batam');
    cy.get('#shipping\\[address2\\]').type('batam');
    cy.contains('avored.fields.country_id')
      .next()
      .click()
      .find('ul>li')
      .contains('Indonesia')
      .click();

    cy.get('#shipping\\[state\\]').type('kepri');
    cy.get('#shipping\\[postcode\\]').type(12345);
    cy.get('#shipping\\[city\\]').type('kota');
    cy.get('button[type=submit]').contains('Place Order').click();
  });
});
