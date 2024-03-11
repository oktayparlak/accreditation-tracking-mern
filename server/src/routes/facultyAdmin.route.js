const router = require('express').Router();

const facultyAdminController = require('../controllers/facultyAdmin.controller');

const facultyAdminSchema = require('../schemas/facultyAdmin.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validateId,
  facultyAdminController.getById
);

router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  facultyAdminController.getAll
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validate(facultyAdminSchema.create),
  facultyAdminController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validateId,
  validate(facultyAdminSchema.update),
  facultyAdminController.update
);

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validateId,
  facultyAdminController.delete
);

module.exports = router;
