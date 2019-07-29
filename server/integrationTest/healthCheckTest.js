const expect = require('chai').expect;
const server = require('../src/server');
const request = require('supertest')(server);

describe('HealthCheck API', () => {
  it('should check health', (done) => {
    request
      .get('/healthcheck')
      .set('Accept', 'application/json')
      .send()
      .end((err, response) => {
        if (err) done(err);
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});
