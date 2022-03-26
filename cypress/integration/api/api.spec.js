describe('Demo My Skill', () => {
  const url = 'https://petstore.swagger.io/v2';

  context('[User] Operations about user', () => {
    const user = {
      id: 7777777777778057,
      username: 'testerFredy',
      firstName: 'Tester',
      lastName: 'Fredy',
      email: 'tester@fredy.com',
      password: 'batam123',
      phone: '0811111',
      userStatus: 0,
    };

    it('creat user', () => {
      cy.request('POST', `${url}/user`, {
        id: 7777777777778057,
        username: 'testerFredy',
        firstName: 'Tester',
        lastName: 'Fredy',
        email: 'tester@fredy.com',
        password: 'batam123',
        phone: '0811111',
        userStatus: 0,
      }).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.code).to.eql(200);
        expect(res.body.type).to.eql('unknown');
        expect(res.body.message).to.not.be.null;
      });
    });
    it('Get user by user name', () => {
      cy.request('GET', `${url}/user/${user.username}`).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.username).to.eql(`${user.username}`);
        expect(res.body.firstName).to.eql(`${user.firstName}`);
        expect(res.body.userStatus).to.eql(1);
      });
    });
    it('Login user use id create before', () => {
      cy.request(
        'GET',
        `${url}/user/login?username=${user.username}&password=${user.password}`
      ).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.include('logged in user session');
      });
    });
    it('Updated user', () => {
      cy.request(
        'GET',
        `${url}/user/login?username=${user.username}&password=${user.password}`
      ).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.include('logged in user session');
      });
      cy.request('PUT', `${url}/user/${user.username}`, {
        id: 0,
        username: 'testerFredy',
        firstName: 'Tester edit',
        lastName: 'Fredy edit',
        email: 'tester@fredy.com',
        password: 'batam123',
        phone: '0811111',
        userStatus: 2,
      }).should((res) => {
        expect(res.status).to.eql(200);
        // expect(res.body.username).to.eql(`${user.firstName} edit`);
        // expect(res.body.firstName).to.eql(`${user.lastName} edit`);
        // expect(res.body.userStatus).to.not.eql(parseInt(user.userStatus));
      });
      cy.request('GET', `${url}/user/${user.username}`).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.username).to.eql(`${user.username}`);
        // expect(res.body.username).to.eql(`${user.firstName} edit`);
        // expect(res.body.firstName).to.eql(`${user.lastName} edit`);
        expect(res.body.userStatus).to.eql(parseInt(user.userStatus) + 1);
      });
    });
  });
  context('[Pet] Access to Petstore orders', () => {
    const pet = {
      id: 120,
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
      status: 'available',
    };
    it('POST - add new pet to store', () => {
      cy.request('POST', `${url}/pet`, {
        id: 120,
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
        status: 'available',
      }).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.id).to.eql(120);
        expect(res.body.name).to.eql(`${pet.name}`);
        expect(res.body.status).to.eql(`${pet.status}`);
      });
    });
    it('PUT - update data pet', () => {
      cy.request('PUT', `${url}/pet`, {
        id: 120,
        category: {
          id: 0,
          name: 'Cat',
        },
        name: 'Kucing Oyen update',
        photoUrls: ['string'],
        tags: [
          {
            id: 0,
            name: 'kucing kampung',
          },
        ],
        status: 'not available',
      }).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.id).to.eql(120);
        expect(res.body.name).to.eql(`${pet.name} update`);
        // expect(res.body.status).to.eql(`${pet.status}`);
      });
      cy.request('GET', `${url}/pet/${pet.id}`).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.id).to.eql(120);
        expect(res.body.name).to.eql(`${pet.name} update`);
      });
    });
  });
  context('CRUD', () => {
    let data;
    it('Add new pet', () => {
      cy.getDataFixture('api', 'pet').then((dataPet) => {
        data = dataPet;
        cy.request('POST', `${url}/pet`, data).should((res) => {
          expect(res.status).to.eql(200);
          expect(res.body.id).to.eql(data.id);
          expect(res.body.name).to.eql(`${data.name}`);
        });
      });
    });
    it('Read data', () => {
      cy.getDataFixture('api', 'pet').then(() => {
        cy.request('GET', `${url}/pet/${data.id}`).should((res) => {
          expect(res.status).to.eql(200);
          expect(res.body.id).to.eql(data.id);
          expect(res.body.name).to.eql(`${data.name}`);
        });
      });
    });
    it('Update data', () => {
      cy.getDataFixture('api', 'pet').then(() => {
        cy.request('PUT', `${url}/pet`, {
          id: 121212,
          category: {
            id: 0,
            name: 'Cat',
          },
          name: 'Pussh Cat edit',
          photoUrls: ['string'],
          tags: [
            {
              id: 0,
              name: 'Kucing Kampung',
            },
          ],
          status: 'sold',
        }).should((res) => {
          expect(res.status).to.eql(200);
          expect(res.body.id).to.eql(data.id);
          expect(res.body.name).to.eql(`${data.name} edit`);
          expect(res.body.status).to.eql(`sold`);
        });
      });
    });
    it('Delete data', () => {
      cy.getDataFixture('api', 'pet').then(() => {
        cy.request('DELETE', `${url}/pet/${data.id}`, {
          header: { api_key: 'special-key' },
        }).should((res) => {
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql(data.id.toString());
        });
      });
    });
    it('check data', () => {
      cy.getDataFixture('api', 'pet').then(() => {
        cy.request({
          method: 'GET',
          url: `${url}/pet/${data.id}`,
          failOnStatusCode: false,
          headers: { 'api-key': 'special-key' },
        }).should((res) => {
          expect(res.status).to.eql(404);
          expect(res.body.message).to.eql('Pet not found');
        });
      });
    });
  });
  context.only('Chaining Test', () => {
    const idPet = '120';
    let dataBuyer = {
      user: {},
      pet: {},
      status: {},
    };
    // user login
    // user belanja
    // user memiliki pet dari hasil belanja
    // status pet menjadi sold
    it('user login', () => {
      cy.getDataFixture('api', 'list-user').then((data) => {
        const user = data[0];
        dataBuyer.user = {
          id: user.id,
          username: user.username,
          password: user.password,
          firstName: user.firstName,
        };
        cy.login(url, dataBuyer.user.username, dataBuyer.user.password);
      });
    });
    it('user belanja', () => {
      cy.log(`user memilih pet id ${idPet}`);
      cy.findPet(url, `${idPet}`);
      cy.createOrder(url, `${idPet}`);
    });
    it('user memiliki pet dari hasil belanja', () => {
      cy.updatePet(url, `${idPet}`);
      cy.request('GET', `${url}/pet/${idPet}`).should((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.id).to.eql(120);
        expect(res.body.status).to.eql(`sold`);
      });
      cy.log(`Result Name User : ${dataBuyer.user.firstName}`);
      cy.log(`Have Pet Pet Name : ${dataBuyer.pet.name}`);
    });
    console.log(dataBuyer);
  });
});
