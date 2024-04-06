const router = require('express').Router();

const measuringToolController = require('../controllers/measuringTool.controller');

const measuringToolSchema = require('../schemas/measuringTool.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get(
  '/course/:courseId',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.COURSE_ADMIN, roles.COURSE_SUPERVISOR]),
  measuringToolController.getByCourseId
);

router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.COURSE_ADMIN, roles.COURSE_SUPERVISOR]),
  measuringToolController.getAll
);

router.get(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.COURSE_ADMIN, roles.COURSE_SUPERVISOR]),
  validateId,
  measuringToolController.getById
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.COURSE_ADMIN]),
  validate(measuringToolSchema.create),
  measuringToolController.create
);

/** Patch */
router.patch(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.COURSE_ADMIN]),
  validateId,
  validate(measuringToolSchema.update),
  measuringToolController.update
);

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.COURSE_ADMIN]),
  validateId,
  measuringToolController.delete
);

module.exports = router;
