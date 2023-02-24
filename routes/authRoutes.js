const express = require('express');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', [
  check('username').not().isEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], authController.signup);

router.post('/login', [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], authController.login);

router.post('/logout', authMiddleware, authController.logout);

router.post('/logoutAll', authMiddleware, authController.logoutAll);

router.get('/me', authMiddleware, authController.me);

module.exports = router;