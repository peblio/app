const expect = require('chai').expect;
const server = require('../src/server');
const request = require('supertest')(server);
const loginCreds = require('./fixtures/loginLogoutFixture');

describe('Retrieve size of all attachments for a user', () => {
  it('should retrieve total size of all uploads for a user', async () => {
    const loginResponse = await request
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send(loginCreds);

    expect(loginResponse.header['set-cookie'][0]).contains('peblioSession-test');
    expect(loginResponse.statusCode).to.equal(200);

    const getFileInfoResponse = await request
      .get('/api/files/size')
      .set('Accept', 'application/json')
      .set('Cookie', loginResponse.header['set-cookie'])
      .send();
    expect(getFileInfoResponse.statusCode).to.equal(200);
    const fileInfo = getFileInfoResponse.body;
    expect(fileInfo.size).to.equal(0);
    expect(fileInfo.unit).to.equal('bytes');
    expect(fileInfo.data.Prefix).to.equal('pebliotest/images/');
    expect(fileInfo.data.Contents).to.deep.equal([]);
  });
});
