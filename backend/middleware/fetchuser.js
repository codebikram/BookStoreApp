const jwt = require('jsonwebtoken');
//secret for JWT token
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const fetchuser = (req, res, next) => {
  //get the user from jwt token and get the id to req object
  const token = req.header('auth-token');
  if (token) {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } else {
    res.status(401).send({ error: 'Please authentcate using a valid token' });
  }
};
module.exports = fetchuser;
