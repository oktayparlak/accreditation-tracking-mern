const Joi = require('joi');
const roles = require('../helpers/roles');

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(
      roles.ROOT_ADMIN,
      roles.FACULTY_ADMIN,
      roles.DEPARTMENT_ADMIN,
      roles.COURSE_ADMIN,
      roles.COURSE_SUPERVISOR
    )
    .required(),
});

module.exports = { login };
