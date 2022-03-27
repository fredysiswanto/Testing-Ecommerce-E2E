describe('Home', () => {
  const url = 'https://stockbit.com';
  beforeEach(() => {
    cy.visit('');
  });

  context('Header', () => {
    const listMenu = [
      ['https://stockbit.com/info/mulai-investasi', 'Investing'],
      ['https://stockbit.com/info/pro-tools', 'Pro Tools'],
      ['https://academy.stockbit.com/', 'Academy'],
      ['https://stockbit.com/about', 'About Us'],
      ['https://blog.stockbit.com/', 'Blog'],
      ['http://help.stockbit.com/', 'Help'],
    ];
    it('link each menu header', () => {
      cy.get('.menuchild-parent.desktop>.menuchild').each((menu, ind) => {
        expect(menu).to.have.text(`${listMenu[ind][1]}`);
        expect(menu[0].href).to.eql(`${listMenu[ind][0]}`);
      });
    });
    it('button sign up and login', () => {
      cy.get('.login-ldn')
        .eq(0)
        .should('have.text', 'Log In')
        .and('have.attr', 'href', `${url}/#/login`)
        .parent()
        .should('have.class', 'button-light');
      cy.get('.register-lnd')
        .eq(0)
        .should('have.text', 'Sign Up')
        .and('have.attr', 'href', `${url}/#/register`);
    });
  });

  context('Content', () => {
    it('content first section ', () => {
      cy.get('.content-in')
        .eq(0)
        .within(() => {
          cy.get('.home-title')
            .should('be.visible')
            .and('have.text', 'Investasi Saham Bersama');
          cy.get('.home-dymtext')
            .children()
            .should('have.class', 'active')
            .should('be.visible');
          cy.get('.home-text').should(
            'have.text',
            // 'Stockbit adalah aplikasi untuk kamu yang ingin berdiskusi, analisa dan investasi saham dalam satu tempat.'
            // need clear character non print
            '\n\t\t\t\t\t\tStockbit adalah aplikasi untuk kamu yang ingin berdiskusi,\n\t\t\t\t\t\tanalisa dan investasi saham dalam satu tempat.\n\t\t\t\t\t'
          );
          cy.get('.start-investing')
            .should('have.attr', 'href', `${url}/#/register`)
            .and('have.text', 'Mulai Berinvestasi');
          cy.get('.home-badges.depan')
            .children()
            .eq(0)
            .should(
              'have.attr',
              'href',
              'https://itunes.apple.com/us/app/stockbit/id1184800207?mt=8'
            )
            .children()
            .should(
              'have.attr',
              'src',
              `${url}/assets/template/4b70f6fae447.png`
            );
          cy.get('.home-badges.depan')
            .children()
            .eq(1)
            .should(
              'have.attr',
              'href',
              'https://play.google.com/store/apps/details?id=com.stockbit.android&hl=en'
            )
            .children()
            .should(
              'have.attr',
              'src',
              `${url}/assets/template/f06b908907d5.png`
            );
        });
    });
  });
  context('content', () => {});
  context('Footer', () => {});
});
