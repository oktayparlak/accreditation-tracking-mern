const router = require('express').Router();

const authController = require('../controllers/auth.controller');

const authSchema = require('../schemas/auth.schema');
const validate = require('../middlewares/validateSchema');

/** Post */
router.post('/login', validate(authSchema.login), authController.login);

module.exports = router;
