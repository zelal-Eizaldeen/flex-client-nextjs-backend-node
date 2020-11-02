const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const checkAuth = require('../middleware/check-auth');

const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  // fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

router.post('/signin', usersController.signin);
router.post('/signout', usersController.signout);
router.get('/currentuser',checkAuth, usersController.getCurrentUser);
module.exports = router;
