import Joi from "joi";

export const createEventValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    eventImage: Joi.string().optional(),
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
