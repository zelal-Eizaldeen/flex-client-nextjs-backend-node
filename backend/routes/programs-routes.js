const express = require('express');
const { check } = require('express-validator');

const programsControllers = require('../controllers/programs-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/:pid', programsControllers.getProgramById);

router.get('/user/:uid', programsControllers.getProgramsByUserId);
router.use(checkAuth);
router.post(
  '/',
  // fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('weight')
      .not()
      .isEmpty()
  ],
  programsControllers.createProgram
);

router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  programsControllers.updateProgram
);

router.delete('/:pid', programsControllers.deleteProgram);

module.exports = router;
