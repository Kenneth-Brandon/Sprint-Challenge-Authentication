const request = require('supertest');
const server = require('../api/server.js');

describe('POST / Register', () => {
  it('should return message - problem with db', () => {
    return request(server)
      .post('/api/auth/register')
      .catch((res) => {
        expect(res.body).toEqual({ message: 'problem with the db' });
      });
  });
  it('should return 500', () => {
    return request(server)
      .post('/api/auth/register')
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });
});

describe('POST / Login', () => {
  it('should return message - you shall not pass', () => {
    return request(server)
      .post('/api/auth/login')
      .send({ username: 'alessandra123', password: 'password123' })
      .then((res) => {
        expect(res.body).toEqual({ message: 'You shall not pass!' });
      });
  });
  it('should return message - problem with the db', () => {
    return request(server)
      .post('/api/auth/login')
      .catch((res) => {
        expect(res.body).toEqual({ message: 'problem with the db' });
      });
  });
});
