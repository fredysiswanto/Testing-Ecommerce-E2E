describe('Api Testing', () => {
  const urlApi = 'https://reqres.in/api/';
  const reqUrl = ['users'];
  context('testing request [GET]', () => {
    it('all user [/users]', () => {
      cy.request({
        method: 'GET',
        url: `${urlApi}${reqUrl[0]}`,
      }).should((response) => {
        const dataRes = response.body;
        expect(response.status).to.eq(200);
        expect(dataRes.page).to.eq(1);
        expect(dataRes.per_page).to.eq(6);
        expect(dataRes.total).to.eq(12);
        expect(dataRes.data.length).to.eq(6);
        expect(response.body.data[0]).to.have.all.keys([
          'id',
          'email',
          'first_name',
          'last_name',
          'avatar',
        ]);
      });
    });
    it('single user [/users]', () => {
      cy.request({
        method: 'GET',
        // prettier-ignore
        url: `${urlApi}${reqUrl[0]+'/2'}`,
      }).should((response) => {
        const dataRes = response.body;
        expect(response.status).to.eq(200);
        expect(dataRes.data).deep.eq({
          id: 2,
          email: 'janet.weaver@reqres.in',
          first_name: 'Janet',
          last_name: 'Weaver',
          avatar: 'https://reqres.in/img/faces/2-image.jpg',
        });
      });
    });
    it('single user [/users]', () => {
      cy.request({
        method: 'GET',
        // prettier-ignore
        url: `${urlApi}${reqUrl[0]+'/23'}`,
        failOnStatusCode: false,
      }).should((response) => {
        const dataRes = response.body;
        expect(response.status).to.eq(404);
        expect(dataRes).deep.eq({});
      });
    });
  });
  context('testing Create [POST]', () => {
    it('create new user [/users]', () => {
      cy.request({
        method: 'POST',
        // prettier-ignore
        url: `${urlApi}${reqUrl[0]+"/"}`,
        body: {
          name: 'morpheus',
          job: 'leader',
        },
      }).should((response) => {
        const dataRes = response.body;
        expect(response.status).eq(201);
        expect(parseInt(dataRes.id)).greaterThan(0);
        expect(dataRes.createdAt).include('2021-09-21');
      });
    });
  });
  context('testing Create [PUT]', () => {
    it('create new user [/users/{param}]', () => {
      cy.request({
        method: 'PUT',
        // prettier-ignore
        url: `${urlApi}${reqUrl[0]+"/1"}`,
        body: {
          name: 'morpheus',
          job: 'leader',
        },
      }).should((response) => {
        const dataRes = response.body;
        expect(response.status).eq(200);
        expect(dataRes).deep.include({
          name: 'morpheus',
          job: 'leader',
        });
      });
    });
  });
});
