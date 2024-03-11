const router = require('express').Router();

const departmentAdminController = require('../controllers/departmentAdmin.controller');

const departmentAdminSchema = require('../schemas/departmentAdmin.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  departmentAdminController.getById
);

router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  departmentAdminController.getAll
);

router.get(
  '/user/:userId',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  departmentAdminController.getByUserId
);

router.get(
  '/department/:departmentId',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  departmentAdminController.getByDepartmentId
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validate(departmentAdminSchema.create),
  departmentAdminController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validateId,
  validate(departmentAdminSchema.update),
  departmentAdminController.update
);

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validateId,
  departmentAdminController.delete
);

module.exports = router;
