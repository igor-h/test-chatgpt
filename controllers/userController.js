const User = require('../models/user');
const { errorHandler } = require('../utils');

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    errorHandler(err, res);
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
}

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    res.status(201).json({
      success: true,
      user
    });
  } catch (err) {
    errorHandler(err, res);
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true });
  } catch (err) {
    errorHandler(err, res);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
