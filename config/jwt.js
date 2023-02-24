const jwt = require('jsonwebtoken');
const config = require('./config');

function sign(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
}

function verify(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = {
  sign,
  verify
};