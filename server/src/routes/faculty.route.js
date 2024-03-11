const router = require('express').Router();

const facultyController = require('../controllers/faculty.controller');

const facultySchema = require('../schemas/faculty.schema');
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
  facultyController.getById
);

router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  facultyController.getAll
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validate(facultySchema.create),
  facultyController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validateId,
  validate(facultySchema.update),
  facultyController.update
);

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validateId,
  facultyController.delete
);

module.exports = router;
