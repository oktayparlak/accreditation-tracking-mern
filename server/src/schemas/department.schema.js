const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().required(),
  facultyId: Joi.string().required(),
});

const update = Joi.object({
  name: Joi.string(),
  facultyId: Joi.string(),
});

module.exports = { create, update };
