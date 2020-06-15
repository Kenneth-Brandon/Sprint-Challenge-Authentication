const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('POST /', () => {
  it('AFTER POST should return 200 ok', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'Will5',
      password: '123',
    });
    expect(res.status).toBe(200);
  });
  it('should return username after register', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Will5', password: '123' });
    expect(res.body.username).toBe('Will5');
  });
  it('should return message user after login', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Will5', password: '123' });
    expect(res.type).toBe('application/json');
  });
  beforeEach(async () => {
    await db('users').truncate();
  });
});
describe('get / LOGOUT', () => {
  it('AFTER logout should return 200 ok', async () => {
    const res = await request(server).get('/api/auth/logout');
    expect(res.status).toBe(200);
  });
});
