const router = require('express').Router();

const authController = require('../controllers/auth.controller');

const authSchema = require('../schemas/auth.schema');
const validate = require('../middlewares/validateSchema');

/** Post */
router.post('/login', validate(authSchema.login), authController.login);

/** Get */
router.post('/check-token', authController.checkToken);

module.exports = router;
