const router = require('express').Router();

const departmentController = require('../controllers/department.controller');

const departmentSchema = require('../schemas/department.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */

/** Post */

/** Patch */

/** Delete */

module.exports = router;
