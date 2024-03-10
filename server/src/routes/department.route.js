const router = require('express').Router();

const departmentController = require('../controllers/department.controller');

const departmentSchema = require('../schemas/department.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get(
  '/:id',
  verify,
  allowedRoles([
    roles.ROOT_ADMIN,
    roles.SUPER_ADMIN,
    roles.DEPARTMENT_ADMIN,
    roles.COURSE_ADMIN,
  ]),
  validateId,
  departmentController.getById
);

router.get(
  '/',
  verify,
  allowedRoles([
    roles.ROOT_ADMIN,
    roles.SUPER_ADMIN,
    roles.DEPARTMENT_ADMIN,
    roles.COURSE_ADMIN,
  ]),
  departmentController.getAll
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN]),
  validate(departmentSchema.create),
  departmentController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN]),
  validateId,
  validate(departmentSchema.update),
  departmentController.update
);

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN]),
  validateId,
  departmentController.delete
);

module.exports = router;
