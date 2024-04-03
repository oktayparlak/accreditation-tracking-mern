const router = require('express').Router();

const userController = require('../controllers/user.controller');

const userSchema = require('../schemas/user.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */

router.get(
  '/no-role',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  userController.getUsersWithoutRole
);

router.get('/role', verify, allowedRoles([roles.ROOT_ADMIN]), userController.getUsersWithRole);

router.get(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN, roles.COURSE_ADMIN]),
  validateId,
  userController.getById
);

router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN, roles.COURSE_ADMIN]),
  userController.getAll
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validate(userSchema.create),
  userController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validateId,
  validate(userSchema.update),
  userController.update
);

/** Delete */
router.delete('/:id', verify, allowedRoles([roles.ROOT_ADMIN]), validateId, userController.delete);

module.exports = router;
