const Joi = require('joi');

const create = Joi.object({
  departmentId: Joi.string().uuid().required(),
  content: Joi.string().required(),
  contributionLevel: Joi.string().valid('1', '2', '3', '4', '5').required(),
});

const update = Joi.object({
  content: Joi.string(),
  contributionLevel: Joi.string().valid('1', '2', '3', '4', '5'),
});

module.exports = { create, update };
