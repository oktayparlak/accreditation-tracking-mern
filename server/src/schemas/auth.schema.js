const Joi = require('joi');
const roles = require('../helpers/roles');

const login = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
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
