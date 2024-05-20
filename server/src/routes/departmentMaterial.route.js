const router = require('express').Router();

const departmentMaterialController = require('../controllers/departmentMaterial.controller');

const departmentMaterialSchema = require('../schemas/departmentMaterial.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  departmentMaterialController.getAll
);

router.get(
  '/course/:courseId',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  departmentMaterialController.getByCourseId
);

router.get(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  departmentMaterialController.getById
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validate(departmentMaterialSchema.create),
  departmentMaterialController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  validate(departmentMaterialSchema.update),
  departmentMaterialController.update
);

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  departmentMaterialController.delete
);

module.exports = router;
