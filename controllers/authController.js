const jwt = require('../config/jwt');
const User = require('../models/user');
const { errorHandler } = require('../utils');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    const token = jwt.sign({ id: user._id });

    res.status(201).json({
      success: true,
      token
    });
  } catch (err) {
    errorHandler(err, res);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id });

    res.json({
      success: true,
      token
    });
  } catch (err) {
    errorHandler(err, res);
  }
}

module.exports = {
  register,
  login
};