describe('Nav', () => {
  const baseURL = 'http://127.0.0.1:8000';

  beforeEach(() => {
    cy.setCookie('botble_cookie_newsletter', '1');
    cy.visit('/');
    cy.get('ul.navbar-nav').children().as('menu');
  });

  it('All Categories Url Test', () => {
    cy.get('#navCatContent > ul')
      .children()
      .each(($menu, $ind) => {
        if ($ind < 10) {
          const text = $menu
            .find('span')
            .text()
            .toLowerCase()
            .replace(/\s\&\s|\s/g, '-');
          cy.get($menu)
            .children()
            .first()
            .should(
              'include.attr',
              'href',
              `${baseURL}/product-categories/${text}`
            );
          cy.request(`${baseURL}/product-categories/${text}`);
        }
      });
  });
  it('All Categories with sub Category', () => {
    cy.get('#navCatContent > ul > li > .dropdown-toggler').each(($menu) => {
      cy.get($menu)
        .click({ force: true })
        .parent()
        .should('have.class', 'show')
        .find('a.nav_item')
        .each(($item) => {
          const text = $item
            .text()
            .toLowerCase()
            .replace(/\s\&\s|\s/g, '-')
            .replace('.', '');
          cy.get($item).should(
            'include.attr',
            'href',
            `${baseURL}/product-categories/${text}`
          );
          cy.request(`${baseURL}/product-categories/${text}`);
        });
    });
  });

  it('navbar-nav on header', () => {
    cy.get('@menu')
      .first()
      .should('include.text', 'Home')
      .should('include.class', 'active')
      .click()
      .url()
      .should('include', baseURL);
    cy.get('@menu')
      .eq(1)
      .should('include.text', 'Products')
      .should('not.include.class', 'active')
      .click();
    cy.get('@menu')
      .eq(1)
      .should('include.class', 'active')
      .url()
      .should('include', `${baseURL}/products`);
    cy.get('@menu')
      .eq(4)
      .should('include.text', 'Contact us')
      .should('not.include.class', 'active')
      .click();
    cy.get('@menu')
      .eq(4)
      .should('include.class', 'active')
      .url()
      .should('include', `${baseURL}/contact-us`);
  });
  it.skip('navbar-nav on header have sub category [Shop]', () => {
    cy.get('@menu')
      .eq(2)
      .realHover()
      .find('.dropdown-item')
      .each(($item) => {
        const text = $item
          .text()
          .toLowerCase()
          .trim()
          .replace(/\s\&\s|\s/g, '-')
          .replace('.', '');
        cy.get($item).should('includes.attr', 'href', `${baseURL}/${text}/`);
        cy.request(`${baseURL}/${text}`);
      });
  });

  it('navbar-nav on header have sub category [Blog]', () => {
    cy.get('@menu')
      .eq(3)
      .realHover()
      .find('.dropdown-item')
      .each(($item) => {
        cy.get($item)
          .should('have.attr', 'href')
          .then((href) => {
            cy.request(href);
          });
      });
  });
});
