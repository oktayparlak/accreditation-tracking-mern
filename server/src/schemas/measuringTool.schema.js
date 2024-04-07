const Joi = require('joi');

const create = Joi.object({
  courseId: Joi.string().required(),
  name: Joi.string().required(),
  impactRate: Joi.number().required(),
  questionCount: Joi.number(),
});

const update = Joi.object({
  courseId: Joi.string().required(),
  name: Joi.string().required(),
  impactRate: Joi.number().required(),
  questionCount: Joi.number(),
});

module.exports = { create, update };
