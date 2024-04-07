const router = require('express').Router();

const applicationController = require('../controllers/application.controller');

const upload = require('../configs/file');
const applicationSchema = require('../schemas/application.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const validateId = require('../middlewares/validateId');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get(
  '/download/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validateId,
  applicationController.downloadFile
);

router.get(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  applicationController.getAll
);

router.get(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.FACULTY_ADMIN]),
  validateId,
  applicationController.getById
);

/** Post */
router.post(
  '/',
  verify,
  allowedRoles([roles.ROOT_ADMIN, roles.COURSE_SUPERVISOR]),
  validate(applicationSchema.create),
  upload.array('reports', 7),
  applicationController.create
);

/** Patch */

/** Delete */
router.delete(
  '/:id',
  verify,
  allowedRoles([roles.ROOT_ADMIN]),
  validateId,
  applicationController.delete
);

module.exports = router;
