const request = require('supertest');
const server = require('../api/server.js');

describe('GET /', () => {
  it('should return JSON type', () => {
    return request(server)
      .get('/api/jokes/')
      .then((res) => {
        expect(res.type).toBe('application/json');
      });
  });
  it('should return message', () => {
    return request(server)
      .get('/api/jokes')
      .catch((res) => {
        expect(res.body).toBe({ message: 'Error Fetching Jokes' });
      });
  });
});
