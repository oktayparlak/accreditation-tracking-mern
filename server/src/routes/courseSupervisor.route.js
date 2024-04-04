const router = require('express').Router();

const courseSupervisorController = require('../controllers/courseSupervisor.controller');

const courseSupervisorSchema = require('../schemas/courseSupervisor.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get(
  '/role',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  courseSupervisorController.getAllWithRole
);

router.get(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  courseSupervisorController.getById
);

router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  courseSupervisorController.getAll
);

router.get(
  '/user/:userId',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  courseSupervisorController.getByUserId
);

router.get(
  '/course/:courseId',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN, roles.DEPARTMENT_ADMIN]),
  validateId,
  courseSupervisorController.getByCourseId
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validate(courseSupervisorSchema.create),
  courseSupervisorController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validateId,
  validate(courseSupervisorSchema.update),
  courseSupervisorController.update
);

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validateId,
  courseSupervisorController.delete
);

module.exports = router;
