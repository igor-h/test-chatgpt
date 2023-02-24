const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', [
  check('username').not().isEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.createUser);

router.get('/', authMiddleware, userController.getAllUsers);

router.get('/:id', authMiddleware, userController.getUserById);

router.patch('/:id', authMiddleware, userController.updateUserById);

router.delete('/:id', authMiddleware, userController.deleteUserById);

module.exports = router;