const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UsersDB = require('../database/dbConfig');

router.post('/register', async (req, res) => {
  // implement registration
  let { username, password } = req.body;
  console.log(username);
  if (username && typeof password === 'string') {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(password, rounds);
    password = hash;
    try {
      await UsersDB('users').insert({ username, password });
      res.status(200).json({ username, password });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error', err: err });
    }
  } else {
    res.status(404).json({
      message: 'please provide username and password ',
    });
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
    let user = await await UsersDB('users').where({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      // console.log(req.session);
      res.status(200).json({ message: 'Logged in' });
    } else {
      res
        .status(401)
        .json({ message: 'You shall not pass! Invalid credentials' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error', err: err });
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send('error when trying to delete session');
      } else {
        console.log(req.session);
        res.send('session deleted');
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
