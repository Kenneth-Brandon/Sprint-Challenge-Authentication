/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, 'banana', (error, decodedToken) => {
      if (!error) {
        req.jwt = decodedToken;
        next();
      } else {
        res.status(400).json({ message: 'Your token is invalid' });
      }
    });
  } else {
    res
      .status(400)
      .json({
        message: 'Please include your authentication token in the header.',
      });
  }
};
