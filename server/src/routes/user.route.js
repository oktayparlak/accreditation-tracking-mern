const router = require('express').Router();

const userController = require('../controllers/user.controller');

const userSchema = require('../schemas/user.schema');
const verify = require('../middlewares/verify');
const validate = require('../middlewares/validateSchema');
const allowedRoles = require('../middlewares/checkRole');

const roles = require('../helpers/roles');

/** Get */
router.get('/:id', verify, userController.getById);

router.get('/', verify, allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN, roles.DEPARTMENT_ADMIN]), userController.getAll);

/** Post */
router.post('/', verify, allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN]), validate(userSchema.create), userController.create);

/** Patch */
router.patch('/:id', verify, allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN]), validate(userSchema.update), userController.update);

/** Delete */
router.delete('/:id', verify, allowedRoles([roles.ROOT_ADMIN, roles.SUPER_ADMIN]), userController.delete);

module.exports = router;
