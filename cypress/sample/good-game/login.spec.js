describe('Test Case Login', () => {
  const userName = 'testerGame159';
  const email = 'tester.tester@gmail.com';
  const password = 'asdf123';
  const timeWaiting = 3000;
  beforeEach(() => {
    // we will create a new alias before each test
    cy.clearCookies();
    cy.visit('https://lp.empire.goodgamestudios.com/');
  });

  it('register with invalid data, suggest with input text', () => {
    cy.get('#name').type('aaa');
    cy.get('#regForm1-name-error')
      .wait(timeWaiting)
      .should('have.class', 'show');
    cy.get('[data-proposal-value]').each(($el, index, $list) => {
      const idSuggest = $el.text().toLowerCase();
      // console.log(idSuggest);
      expect(idSuggest).to.include('aaa');
    });
  });

  it('register with invalid, email', () => {
    cy.get('#name').type(userName);
    cy.get('#mail').type('aaaa@as');
    cy.get('#regForm1-mail-error')
      .wait(timeWaiting)
      .should('have.class', 'show')
      .and('have.text', 'You have entered an invalid email address.');
  });

  it('register with invalid, password', () => {
    cy.get('#name').type(userName);
    cy.get('#mail').type(email);
    cy.get('#password').type('123');
    cy.get('#regForm1-password-error')
      .wait(timeWaiting)
      .should('have.class', 'show');
  });

  it('check all form validation', () => {
    // name input
    cy.get('#name').type('aaa');
    cy.get('#regForm1-name-error')
      .wait(timeWaiting)
      .should('have.class', 'show');
    cy.get('[data-proposal-value]')
      .each(($el, index, $list) => {
        const idSuggest = $el.text().toLowerCase();
        // console.log(idSuggest);
        expect(idSuggest).to.include('aaa');
      })
      .eq(0)
      .click();
    cy.get('#regForm1-name-error')
      .wait(timeWaiting)
      .should('have.class', 'hide');
    // email input
    cy.get('#mail').type('aaaa@as');
    cy.get('#regForm1-mail-error')
      .wait(timeWaiting)
      .should('have.class', 'show')
      .and('have.text', 'You have entered an invalid email address.');
    // password input
    cy.get('#password').type('123');
    cy.get('#regForm1-password-error')
      .wait(timeWaiting)
      .should('have.class', 'show');
  });

  it('register with valid data', () => {
    cy.get('#regForm1-name-wrapper')
      .children('#name')
      .type(userName)
      .wait(timeWaiting)
      .should('have.class', 'success');
    cy.get('#regForm1-mail-wrapper')
      .children('#mail')
      .type(email)
      .should('have.class', 'success');
    cy.get('#regForm1-password-wrapper')
      .children('#password')
      .type(password)
      .should('have.class', 'success');
    cy.get('#regForm1-regform-submit').should('have.text', 'Play');
  });
});
