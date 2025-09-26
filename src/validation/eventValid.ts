import Joi from "joi";

const LocationSchema = Joi.object().keys({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  coordinates: Joi.array().items(Joi.number()).length(2).optional(),
});

export const createEventValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    eventImage: Joi.string().optional(),
    locations: Joi.array().items(LocationSchema).optional(),
  }),
};

const idParam = Joi.object().keys({
  id: Joi.string().hex().length(24).required(),
});

export const updateEventValidation = {
  params: idParam,
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      locations: Joi.array().items(LocationSchema).min(1),
    })
    .min(1),
};

export const getEventValidation = {
  params: idParam,
};

export const deleteEventValidation = {
  params: idParam,
};

export const queryEventValidation = {
  query: Joi.object().keys({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    sortBy: Joi.string().optional(),
  }),
};
