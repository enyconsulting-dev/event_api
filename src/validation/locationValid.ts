import Joi from "joi";

const createLocationValidation = {
  body: Joi.object().keys({
    eventId: Joi.string().required(),
    address: Joi.string(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    coordinates: Joi.array().items(Joi.number()).length(2),
  }),
};

const updateLocationValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    eventId: Joi.string(),
    address: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    coordinates: Joi.array().items(Joi.number()).length(2),
  }),
};

const getLocationValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const deleteLocationValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const queryLocationValidation = {
  query: Joi.object().keys({
    eventId: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export {
  createLocationValidation,
  updateLocationValidation,
  getLocationValidation,
  deleteLocationValidation,
  queryLocationValidation,
};