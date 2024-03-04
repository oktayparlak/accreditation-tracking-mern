const router = require('express').Router();

const authSchema = require('../schemas/auth.schema');
const validate = require('../middlewares/validateSchema');
const authController = require('../controllers/auth.controller');

/** Post */
router.post('/login', validate(authSchema.login), authController.login);

module.exports = router;
