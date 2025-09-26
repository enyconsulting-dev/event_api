import { LocationModel, type LocationDocument } from "../model/index";
import ApiError from "../utils/ApiError";
import getPaginatedData from "../utils/paginationQueries";
import httpStatus from "http-status";

export interface LocationPayload {
  eventId: string;
  address?: string;
  state: string;
  country: string;
  startDate: Date;
  endDate?: Date;
  coordinates?: [number, number];
}

/** Create a new location */
const createLocation = async (payload: LocationPayload) => {
  const location = await LocationModel.create(payload);
  return location;
};

/** Get location by id */
const getLocationById = async (id: string) => {
  const location = await LocationModel.findById(id);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, "Location not found");
  }
  return location;
};

/** Query paginated locations */
const queryLocations = async (queryParams: any) => {
  return getPaginatedData({
    model: LocationModel,
    filters: queryParams.eventId ? { eventId: queryParams.eventId } : {},
    limit: queryParams.limit || 10,
    exclude: [],
    populate: ['eventId']
  });
};

/** Update location by id */
const updateLocationById = async (
  id: string,
  update: Partial<LocationPayload>
) => {
  const location = await LocationModel.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, "Location not found");
  }
  return location;
};

/** Delete location by id */
const deleteLocationById = async (id: string) => {
  const location = await LocationModel.findByIdAndDelete(id);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, "Location not found");
  }
  return location;
};

export {
  createLocation,
  getLocationById,
  queryLocations,
  updateLocationById,
  deleteLocationById,
};