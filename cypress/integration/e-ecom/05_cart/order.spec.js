describe('Cart', () => {
  const userName = 'tester tester';
  const email = 'user@tester.com';
  const password = 'asdfasdf';
  const timeWaiting = 3000;
  const baseURL = 'http://127.0.0.1:8000/';
  beforeEach(() => {
    // we will create a new alias before each test
    // cy.task('queryDb', 'DELETE FROM ec_customer_addresses WHERE id >= 12');
    cy.setCookie('botble_cookie_newsletter', '1');
    cy.visit('/');
  });
  it('add product to cart', () => {
    cy.get('#new-arrival')
      .children()
      .find('.active')
      .eq(1)
      .find('.add-to-cart > .add-to-cart-button ')
      .click({ force: true });
    cy.get('#alert-container')
      .should('have.length.gt', 0)
      .children()
      .should('have.class', 'alert-success');

    cy.get('.cart_count').should('have.text', 1);
    cy.get('.cart_count')
      .parent()
      .realHover()
      .click()
      .parent()
      .should('have.class', 'show');
    cy.get('.cart_list').children().should('have.length.gt', 0);
    cy.get('.cart_box')
      .children('.cart_footer')
      .find('.cart_buttons')
      .children()
      .eq(0)
      .should('have.text', 'View Cart')
      .wait(1000)
      .click()
      .url()
      .should('includes', '/cart');
    cy.get('button[type=submit]').contains('Proceed To CheckOut').click();
    cy.get('a[href="http://127.0.0.1:8000/login"]')
      .click()
      .login(email, password);
    cy.get('#address_name').type('Tester Name');
    cy.get('#address_email').type(email);
    cy.get('#address_phone').type(123123123);
    cy.get('#address_country').select('Indonesia');
    cy.get('#address_state').type('kepri');
    cy.get('#address_city').type('batam');
    cy.get('#address_address').type('ini alamat saya untuk menerima paket');
    cy.get('#payment_bank_transfer').check({ force: true });
    cy.get('button[type=submit]').contains('Checkout').click();
    cy.contains('Your order is successfully placed');
  });
});
