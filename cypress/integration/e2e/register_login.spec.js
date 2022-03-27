describe('Register and Login', () => {
  const url = 'https://stockbit.com';
  context('Register', () => {
    it('Page Register', () => {
      cy.visit('/#/register');
      cy.get('.login-head > a').should('have.attr', 'href', `${url}`);
      cy.get('.register-goog').should('have.value', 'Register with Google');
      cy.get('.register-fb')
        .contains('Register with Facebook')
        .should('be.visible');
      cy.get('.register-email').should('have.text', 'Register with Email');
      cy.contains('Already have a Stockbit account?')
        .should('be.visible')
        .children()
        .should('have.text', 'Login')
        .and('have.attr', 'href', '#/login');
      cy.contains('By signing up you agree with our')
        .should('be.visible')
        .children()
        .should('have.text', 'Terms & Conditions.')
        .and('have.attr', 'href', 'https://my.stockbit.com/terms');
    });
    it('Form Validate', () => {
      cy.visit('/#/register');
      cy.get('.register-email').click();
      cy.get('.loginborderbox')
        .eq(0)
        .find('label')
        .should('have.text', 'Your Name');
      cy.formValidate('#input-1', '@', 'Format fullname salah');
      cy.formValidate('#input-2', 'a', 'Format email salah');
      cy.formValidate('#input-3', 'a', 'username tidak tersedia');
      cy.formValidate(
        '#input-4',
        'a',
        'value harus terdiri dari minimal 6 karakter'
      );
      cy.formValidate('#input-5', 'b', 'Password does not match');
      // cy.get('.hint')
      //   .should('be.visible')
      //   .within(() => {
      //     cy.get('h2').should('have.text', `What's Your Name`);
      //     cy.get('span')
      //       .should(
      //         'have.text',
      //         'Using your real name makes it easier for you to be recognised and build a network.'
      //       )
      //       .and('be.visible');
      //   });
    });

    it('Register with valid input', () => {
      cy.visit('/#/register');
      cy.get('.register-email').click();
      cy.get('#input-1').type('Test Fredy');
      cy.get('#input-2').type('tester.fredy@gmail.com');
      cy.get('#input-3').type('testerFredy');
      cy.get('#input-4').type('test1234');
      cy.get('#input-5').type('test1234');
      cy.get('input[type="submit"]');
      // tinggal hilangin koment klau mau di test sampai ngirim data
      // cy.get('input[type="submit"]').click();
    });
  });

  // email:tester.fredy@gmail.com
  // password : batam123
  context('Login', () => {
    const email = 'tester.fredy@gmail.com',
      password = 'batam123';
    it('Page Login', () => {
      cy.visit('/#/login');
      cy.get('.login-head > a').should(
        'have.attr',
        'href',
        'https://stockbit.com'
      );
      cy.get('.login-goog').should('have.value', 'Log in with Google');
      cy.get('.login-fb').contains('Log in with Facebook').should('be.visible');
      cy.contains('Forgot your password?')
        .should('be.visible')
        .children()
        .should('have.text', ' Click here')
        .and('have.attr', 'href', '#/forgot-password');
      cy.contains('New to Stockbit?')
        .should('be.visible')
        .children()
        .should('have.text', 'Sign Up')
        .and('have.attr', 'href', '#/register');
    });
    it('Form Validate', () => {
      cy.visit('/#/login');
      cy.get('#username').type('a');
      cy.get('#password').type('a');
      cy.get('#loginbutton').click();
      cy.get('.sysmsg-content').within(() => {
        cy.contains('Username atau password salah. Mohon coba lagi.')
          .should('be.visible')
          .wait(5000)
          .should('not.exist');
      });
    });
    it('Login with Valid data', () => {
      cy.visit('/#/login');
      cy.get('#username').type(email);
      cy.get('#password').type(password, { sensitive: true });
      cy.get('#loginbutton').click();
      cy.wait(3000);
      cy.url().should('include', `${url}/#/stream`);
    });
  });
});
