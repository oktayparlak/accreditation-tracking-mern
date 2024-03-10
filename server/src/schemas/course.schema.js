const Joi = require('joi');

const create = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  credit: Joi.number().required(),
  ects: Joi.number().required(),
  compulsory: Joi.boolean().required(),
});

const update = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  credit: Joi.number().required(),
  ects: Joi.number().required(),
  compulsory: Joi.boolean().required(),
});

module.exports = { create, update };
