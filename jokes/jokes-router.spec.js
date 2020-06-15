const request = require('supertest');
const server = require('../api/server.js');
const session = require('supertest-session');

const testSession = null;

beforeEach(function () {
  testSession = session(server);
});

describe('after authenticating session', function () {
  let authenticatedSession;

  beforeEach(function (done) {
    testSession
      .post('/api/auth/login')
      .send({ username: 'Will', password: '123' })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });

  it('should get a restricted page', function (done) {
    authenticatedSession.get('/api/jokes').expect(200).end(done);
  });
});
