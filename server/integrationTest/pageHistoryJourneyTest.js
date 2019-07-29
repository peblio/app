import shortid from 'shortid';

const expect = require('chai').expect;
const server = require('../src/server');
const request = require('supertest')(server);
const loginCreds = require('./fixtures/loginLogoutFixture');
const pageData = require('./fixtures/pageSaveFixture');
const pageVersion1Data = require('./fixtures/pageVersion1SaveFixture');
const pageVersion2Data = require('./fixtures/pageVersion2SaveFixture');

describe('History Of Page Journey', () => {
  it('should save page with versions and restore page', async () => {
    const loginResponse = await request
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(loginCreds);

    expect(loginResponse.header['set-cookie'][0]).contains('peblioSession-local');
    expect(loginResponse.statusCode).to.equal(200);

    pageData.id = shortid.generate();
    const pageSaveResponse = await request
      .post('/api/pages/save')
      .set('Accept', 'application/json')
      .set('Cookie', loginResponse.header['set-cookie'])
      .send(pageData);
    expect(pageSaveResponse.statusCode).to.equal(200);

    pageVersion1Data.id = pageData.id;
    const pageVerion1SaveResponse = await request
      .post('/api/pagesversion')
      .set('Accept', 'application/json')
      .set('Cookie', loginResponse.header['set-cookie'])
      .send(pageVersion1Data);
    expect(pageVerion1SaveResponse.statusCode).to.equal(200);

    pageVersion2Data.id = pageData.id;
    const pageVerion2SaveResponse = await request
      .post('/api/pagesversion')
      .set('Accept', 'application/json')
      .set('Cookie', loginResponse.header['set-cookie'])
      .send(pageVersion2Data);
    expect(pageVerion2SaveResponse.statusCode).to.equal(200);

    const pageVerionsRetrieveResponse = await request
      .get(`/api/pagesversion?id=${pageData.id}`)
      .set('Accept', 'application/json')
      .set('Cookie', loginResponse.header['set-cookie'])
      .send();

    expect(pageVerionsRetrieveResponse.statusCode).to.equal(200);
    expect(pageVerionsRetrieveResponse.body.data.length).to.equal(2);
    const pageVerionDataArray = pageVerionsRetrieveResponse.body.data;
    expect(pageVerionDataArray[0].title).to.equal('Hola1');
    expect(pageVerionDataArray[1].title).to.equal('Hola2');

    const restorePageVersionResponse = await request
      .patch(`/api/pages/restoreVersion?id=${pageData.id}&version=${pageVerionDataArray[1].version_id}`)
      .set('Accept', 'application/json')
      .set('Cookie', loginResponse.header['set-cookie'])
      .send();

    expect(restorePageVersionResponse.statusCode).to.equal(200);

    const getPageResponse = await request
      .get(`/api/pages/${pageData.id}`)
      .set('Accept', 'application/json')
      .set('Cookie', loginResponse.header['set-cookie'])
      .send();

    expect(getPageResponse.statusCode).to.equal(200);
    expect(getPageResponse.body[0].title).to.equal('Hola1');
  });
});
