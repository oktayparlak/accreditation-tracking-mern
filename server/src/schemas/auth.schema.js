const Joi = require('joi');

const login = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  type: Joi.string().valid('ROOT_ADMIN', 'SUPER_ADMIN', 'DEPARTMENT_ADMIN', 'COURSE_ADMIN').required(),
});

module.exports = { login };
