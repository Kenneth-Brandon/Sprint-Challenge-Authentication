const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then((saved) => {
      const token = generateToken(saved);
      res.status(201).json({ created_user: saved, token: token });
    })
    .catch((err) => {
      res.status(500).json({ message: 'problem with the db' });
    });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          jwt_token: token,
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'problem with the db', error: err });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    // other data
  };

  const options = {
    expiresIn: '30 min',
  };

  const token = jwt.sign(payload, secrets.jwt_secret, options);

  return token;
}

module.exports = router;
