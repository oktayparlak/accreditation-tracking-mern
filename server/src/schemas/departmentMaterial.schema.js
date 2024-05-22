const Joi = require('joi');

const create = Joi.object({
  departmentId: Joi.string().uuid().required(),
  content: Joi.string().required(),
});

const update = Joi.object({
  content: Joi.string(),
});

module.exports = { create, update };
