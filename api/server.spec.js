const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('./server.js');
const AuthRouter = require('../auth/auth-router');
const JokesRouter = require('../jokes/jokes-router');

describe('tests each in the auth router', () => {
  beforeEach(async () => {
    await db.seed.run();
  });

  it('has process.env DB_ENV as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  //for the auth-router /api/auth
  server.use('/api/auth', AuthRouter);

  // post('/register'
  describe('test registration', () => {
    it('#1 gets a response when a username and password are added', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ username: 'test', password: 'test' })
        .expect(201)
        .then((res) => {
          expect(res.body.user).toBeDefined();
        });
    });

    it('#2 gets a 400 when a username isnt present', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ password: 'asdfasdf' })
        .then((res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  // post('/login'
  describe('test logging in', () => {
    it('#1 lets you log in with credentials just created', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ username: 'test', password: 'test' })
        .then((res) => {
          return request(server)
            .post('/api/auth/login')
            .send({ username: 'test', password: 'test' })
            .expect(200);
        });
    });

    it('#2 does not let you log in with credentials just created if you use the wrong password', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ username: 'test', password: 'test' })
        .then((res) => {
          return request(server)
            .post('/api/auth/login')
            .send({ username: 'test', password: 'testy' })
            .expect(403);
        });
    });
  });
});

describe('tests the joke router endpoint', () => {
  beforeEach(async () => {
    await db.seed.run();
  });

  //for the auth-router /api/jokes
  server.use('/api/jokes', JokesRouter);

  //get('/',
  it('#1 lets you see the api once you log in with the correct credentials', () => {
    //first register
    return request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' })
      .then((_) => {
        //then log in to get the token
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'test', password: 'test' })
          .then((response) => {
            const token = response.body.token;
            //then use the token to access jokes
            return request(server)
              .get('/api/jokes')
              .set({ Authorization: token })
              .then((jokes) => {
                expect(jokes.body.length).toBeGreaterThan(0);
              });
          });
      });
  });

  it('#2 does not let you do not include the correct token', () => {
    //first register
    return request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' })
      .then((_) => {
        //then log in to get the token
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'test', password: 'test' })
          .then((response) => {
            const token = response.body.token;
            //then use the token to access jokes
            return request(server)
              .get('/api/jokes')
              .set({ Authorization: 'nothing' })
              .then((jokes) => {
                expect(500);
              });
          });
      });
  });
});
