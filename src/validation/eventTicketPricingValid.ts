import Joi from "joi";

export const createPricingValidation = {
  body: Joi.object().keys({
    eventId: Joi.string().hex().length(24).required(),
    locationId: Joi.string().hex().length(24).required(),
    price: Joi.number().min(0).required(),
    currency: Joi.string().required(),
    benefits: Joi.array().items(Joi.string()).optional(),
  }),
};

export const updatePricingValidation = {
  params: Joi.object().keys({ id: Joi.string().hex().length(24).required() }),
  body: Joi.object()
    .keys({
      eventId: Joi.string().hex().length(24),
      locationId: Joi.string().hex().length(24),
      price: Joi.number().min(0),
      currency: Joi.string(),
      benefits: Joi.array().items(Joi.string()),
    })
    .min(1),
};

export const getPricingValidation = {
  params: Joi.object().keys({ id: Joi.string().hex().length(24).required() }),
};

export const deletePricingValidation = getPricingValidation;

export const queryPricingValidation = {
  query: Joi.object().keys({ page: Joi.number().optional(), limit: Joi.number().optional() }),
};
