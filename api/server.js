const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const knexSessionStore = require('connect-session-knex')(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const sessionConfig = {
  name: 'Cookies',
  secret: 'sssh secret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require('../database/dbConfig.js'),
    tableName: 'session',
    sidFieldName: 'sid',
    createTable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

const server = express();
server.use(session(sessionConfig));

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
