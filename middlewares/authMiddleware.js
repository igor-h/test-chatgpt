const jwt = require('../config/jwt');
const User = require('../models/user');
const { errorHandler } = require('../utils');

async function authMiddleware(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token);

    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    errorHandler(err, res, 401);
  }
}

module.exports = authMiddleware;