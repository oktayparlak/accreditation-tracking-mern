const Joi = require('joi');

const create = Joi.object({
  courseId: Joi.string().required(),
  name: Joi.string().required(),
  impactRate: Joi.number().required(),
  questionCount: Joi.number().required(),
});

const update = Joi.object({
  courseId: Joi.string().required(),
  name: Joi.string().required(),
  impactRate: Joi.number().required(),
  questionCount: Joi.number().required(),
});

module.exports = { create, update };
