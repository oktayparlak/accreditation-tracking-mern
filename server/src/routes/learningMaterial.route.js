const router = require('express').Router();

const learningMaterialController = require('../controllers/learningMaterial.controller');

const learningMaterialSchema = require('../schemas/learningMaterial.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN, roles.DEPARTMENT_ADMIN, roles.COURSE_ADMIN]),
  validate(learningMaterialSchema.create),
  learningMaterialController.getAll
);

router.get(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN, roles.DEPARTMENT_ADMIN, roles.COURSE_ADMIN]),
  validateId,
  learningMaterialController.getById
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN, roles.DEPARTMENT_ADMIN, roles.COURSE_ADMIN]),
  validate(learningMaterialSchema.create),
  learningMaterialController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  validate(learningMaterialSchema.update),
  learningMaterialController.update
);

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  learningMaterialController.delete
);

module.exports = router;
