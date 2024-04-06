const Joi = require('joi');

const create = Joi.object({
  courseId: Joi.string().uuid().required(),
  content: Joi.string().required(),
  contributionLevel: Joi.string().valid('1', '2', '3', '4', '5').required(),
  impactSum: Joi.number().precision(2),
  impactTotal: Joi.number().precision(2),
  succesRate: Joi.number().precision(2),
  succesPoint: Joi.number().precision(2),
});

const update = Joi.object({
  courseId: Joi.string().uuid(),
  content: Joi.string(),
  contributionLevel: Joi.string().valid('1', '2', '3', '4', '5'),
  number: Joi.number().integer(),
  impactSum: Joi.number().precision(2),
  impactTotal: Joi.number().precision(2),
  succesRate: Joi.number().precision(2),
  succesPoint: Joi.number().precision(2),
});

module.exports = { create, update };
