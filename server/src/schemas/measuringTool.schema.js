const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().required(),
  impactRate: Joi.number().required(),
});

const update = Joi.object({
  name: Joi.string().required(),
  impactRate: Joi.number().required(),
});

module.exports = { create, update };
