const Joi = require('joi');

const create = Joi.object({
  departmentId: Joi.string().required(),
  code: Joi.string().required(),
  name: Joi.string().required(),
  credit: Joi.number().required(),
  ects: Joi.number().required(),
  academicYear: Joi.string().required(),
  studentCount: Joi.number().required(),
  compulsory: Joi.boolean().required(),
  term: Joi.string().required(),
});

const update = Joi.object({
  departmentId: Joi.string().required(),
  code: Joi.string().required(),
  name: Joi.string().required(),
  credit: Joi.number().required(),
  ects: Joi.number().required(),
  academicYear: Joi.string().required(),
  studentCount: Joi.number().required(),
  compulsory: Joi.boolean().required(),
  term: Joi.string().required(),
});

module.exports = { create, update };
