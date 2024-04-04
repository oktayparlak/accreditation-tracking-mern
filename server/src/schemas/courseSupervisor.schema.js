const Joi = require('joi');

const create = Joi.object({
  userId: Joi.string().uuid().required(),
  courseId: Joi.string().uuid().required(),
});

const update = Joi.object({
  userId: Joi.string().uuid().required(),
  courseId: Joi.string().uuid().required(),
});

module.exports = { create, update };
