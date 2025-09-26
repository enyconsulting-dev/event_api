import Joi from "joi";

export const registerAttendValidation = {
  body: Joi.object().keys({
    eventTicketPricingId: Joi.string().hex().length(24).required(),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().optional(),
  }),
};

export const verifyPassValidation = {
  params: Joi.object().keys({ passId: Joi.string().required() }),
};

export const getAttendValidation = {
  params: Joi.object().keys({ id: Joi.string().hex().length(24).required() }),
};

export const updateAttendValidation = {
  params: Joi.object().keys({ id: Joi.string().hex().length(24).required() }),
  body: Joi.object().keys({
    fullName: Joi.string(),
    email: Joi.string().email(),
    mobileNumber: Joi.string(),
    paymentIntent: Joi.string(),
  }).min(1),
};

export const deleteAttendValidation = getAttendValidation;

export const queryAttendValidation = {
  query: Joi.object().keys({ page: Joi.number().optional(), limit: Joi.number().optional() }),
};
