const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('./auth-model.js');

//for generating a login token
function generateToken(user) {
  const payload = {
    subject: user.username,
  };
  const secret = 'banana';
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, secret, options);
}

router.post('/register', validateUserInfo, (req, res) => {
  // implement registration
  //hash the passsword
  const hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hash;

  //add the user
  Users.addUser(req.body)
    .then((response) => {
      res
        .status(201)
        .json({ message: `User number ${response} created`, user: response });
    })
    .catch((Err) => {
      res.status(500).json({ message: 'Error creating user', error: err });
    });
});

router.post('/login', (req, res) => {
  // implement login
  const user = req.body;

  Users.getUserByUsername(user.username)
    .then(([storedUser]) => {
      console.log(storedUser);
      if (!storedUser) {
        res.status(404).json({ message: 'User not found' });
      } else if (bcrypt.compareSync(user.password, storedUser.password)) {
        const token = generateToken(storedUser);
        res.status(200).json({ message: 'Credentials match', token: token });
      } else {
        res.status(403).json({ message: 'Credentials incorrect' });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error checking credentials', error: err });
    });
});

router.get('/users', (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((Err) => {
      res.status(500).json({ message: 'Error retrieving users', error: err });
    });
});

function validateUserInfo(req, res, next) {
  if (req.body && req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ message: 'Please include a username and password' });
  }
}
module.exports = router;
