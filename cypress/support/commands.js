// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('login', (email, password) => {
//   cy.visit('/');
//   cy.get('[href="http://127.0.0.1:8000/login"]')
//     .should('includes.text', 'Login')
//     .click();
//   cy.get('#txt-email').type(email);
//   cy.get('#txt-password').type(password);
//   cy.get('button[type=submit]').contains('Log in').click();
// });

// ambil data dari fixture
Cypress.Commands.add('getDataFixture', (file, obj) => {
  cy.fixture(`${file}-data.json`).then((data) => data[`${obj}`]);
});
Cypress.Commands.add('findPet', (url, id) => {
  cy.request({
    method: 'GET',
    url: `${url}/pet/${id}`,
    failOnStatusCode: false,
  }).should((res) => {
    if (res.status === 200) {
      cy.log(`Your Pet : ${res.body.name} berhasil di temukan`);
    } else if (res.status === 400) {
      cy.log(res.body.message);
    } else if (res.status === 404) {
      cy.log(res.body.message);
    } else {
      cy.log(res.body.message);
    }
  });
});
Cypress.Commands.add('createOrder', (url, id) => {
  cy.request({
    method: 'POST',
    url: `${url}/store/order`,
    failOnStatusCode: false,
    body: {
      id: 0,
      petId: `${id}`,
      quantity: 1,
      shipDate: '2022-03-26T05:06:48.466+0000',
      status: 'placed',
      complete: true,
    },
    headers: { 'api-key': 'special-key' },
  }).should((res) => {
    if (res.status === 200) {
      cy.log(
        `Anda Memiliki Pet ${res.body.quantity} dengan id ${res.body.petId}`
      );
    } else if (res.status === 400) {
      cy.log(res.body.message);
    } else if (res.status === 404) {
      cy.log(res.body.message);
    } else {
      cy.log(res.body.message);
    }
  });
});
function updatePet(url, id) {
  cy.request({
    method: 'PUT',
    url: `${url}/pet`,
    failOnStatusCode: false,
    body: {
      id: `${id}`,
      category: {
        id: 0,
        name: 'Cat',
      },
      name: 'Kucing Oyen',
      photoUrls: ['string'],
      tags: [
        {
          id: 0,
          name: 'kucing kampung',
        },
      ],
      status: 'sold',
    },
    headers: { 'api-key': 'special-key' },
  }).should((res) => {
    if (res.status === 200) {
      cy.log(`Pet ${res.body.name} dengan Status ${res.body.status}`);
    } else if (res.status === 400) {
      cy.log(res.body.message);
    } else if (res.status === 404) {
      cy.log(res.body.message);
    } else if (res.status === 405) {
      cy.log(res.body.message);
    } else {
      cy.log(res.status);
    }
  });
}
Cypress.Commands.add('updatePet', updatePet);

Cypress.Commands.add('login', (url, username, password) => {
  cy.request(
    'GET',
    `${url}/user/login?username=${username}&password=${password}`
  ).should((res) => {
    expect(res.status).to.eql(200);
    expect(res.body.message).to.include('logged in user session');
    cy.log('Berhasil Login');
  });
});
