const Joi = require('joi');

const create = Joi.object({
  data: {
    courseId: Joi.string().required(),
    measuringTools: Joi.array()
      .items({
        id: Joi.string().required(),
        questions: Joi.array()
          .items({
            number: Joi.number().required(),
            avarage: Joi.number().required(),
            fullPoint: Joi.number().required(),
            releatedItems: Joi.array().items(Joi.string()).required(),
          })
          .required(),
      })
      .required(),
  },
});

const update = Joi.object({});

module.exports = { create, update };
