const Joi = require('joi');
const roles = require('../helpers/roles');

const create = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(
      roles.FACULTY_ADMIN,
      roles.DEPARTMENT_ADMIN,
      roles.COURSE_ADMIN,
      roles.COURSE_SUPERVISOR,
      ''
    )
    .allow(null),
});

const update = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(
    roles.FACULTY_ADMIN,
    roles.DEPARTMENT_ADMIN,
    roles.COURSE_ADMIN,
    roles.COURSE_SUPERVISOR,
    ''
  ),
});

module.exports = { create, update };
