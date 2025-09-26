import {
  EventTicketPricingModel,
  type EventTicketPricingPayload,
} from "../model/index";
import ApiError from "../utils/ApiError";
import getPaginatedData from "../utils/paginationQueries";
import httpStatus from "http-status";

/** Create a new ticket pricing */
const createPricing = async (payload: EventTicketPricingPayload) => {
  const pricing = await EventTicketPricingModel.create(payload);
  return pricing;
};

/** Get pricing by id */
const getPricingById = async (id: string) => {
  const pricing = await EventTicketPricingModel.findById(id);
  if (!pricing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pricing not found");
  }
  return pricing;
};

/** Query paginated pricings */
const queryPricings = async (queryParams: any) => {
  return getPaginatedData({
    model: EventTicketPricingModel,
    filters: {},
    limit: queryParams.limit || 10,
    exclude: [],
  });
};

/** Update pricing by id */
const updatePricingById = async (
  id: string,
  update: Partial<EventTicketPricingPayload>
) => {
  const pricing = await EventTicketPricingModel.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  if (!pricing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pricing not found");
  }
  return pricing;
};

/** Delete pricing by id */
const deletePricingById = async (id: string) => {
  const pricing = await EventTicketPricingModel.findByIdAndDelete(id);
  if (!pricing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pricing not found");
  }
  return pricing;
};

export {
  createPricing,
  getPricingById,
  queryPricings,
  updatePricingById,
  deletePricingById,
};
