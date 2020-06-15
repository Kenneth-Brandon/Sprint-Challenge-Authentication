/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "can't touch this" });
        } else {
          req.decodedJWT = decodedToken;
          next();
        }
      });
    } else {
      throw new Error('invalid auth data');
    }
  } catch (err) {
    res.status(401).json(err.message);
  }
};
