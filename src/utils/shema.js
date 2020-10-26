const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemas = {
  taskIdentification: {
    taskId: Joi.objectId().required(),
    boardId: Joi.objectId().required()
  },
  id: {
    id: Joi.objectId().required()
  },
  userBody: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string()
        .min(3)
        .max(40)
        .required(),
      login: Joi.string()
        .min(3)
        .max(40)
        .required(),
      password: Joi.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/
      )
    }),
  boardBody: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      title: Joi.string()
        .min(3)
        .max(30)
        .required(),
      columns: Joi.array().required()
    }),
  taskBody: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      title: Joi.string()
        .min(3)
        .max(30)
        .required(),
      order: Joi.number().required()
    })
};

module.exports = schemas;
