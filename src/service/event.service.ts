import { EventModel, type CreateLocationPayload } from "../model/index";
import ApiError from "../utils/ApiError";
import getPaginatedData from "../utils/paginationQueries";
import httpStatus from "http-status";

interface CreateEventPayload {
  title: string;
  description?: string;
  eventImage?: string;
}

/** Create a new event */
const createEvent = async (payload: CreateEventPayload) => {
  const event = await EventModel.create(payload);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not Created");
  }
  return event;
};

/** Get event by id */
const getEventById = async (id: string) => {
  const event = await EventModel.findById(id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  return event;
};

/** Query events with pagination and optional filters */
const queryEvents = async (queryParams: any) => {
  // Delegate to pagination helper which returns a formatted response
  return getPaginatedData({
    model: EventModel,
    filters: {},
    limit: queryParams.limit || 10,
    exclude: [],
  });
};

/** Update event by id */
const updateEventById = async (
  id: string,
  update: Partial<CreateEventPayload>
) => {
  // Remove keys that are null/undefined/empty so we only update provided values
  const cleanse = (obj: any): any => {
    if (obj === null || obj === undefined) return undefined;
    if (Array.isArray(obj)) {
      const arr: any[] = obj
        .map((v: any) => cleanse(v))
        .filter((v: any) => v !== undefined && v !== null && !(typeof v === "string" && v.trim() === ""));
      return arr.length > 0 ? arr : undefined;
    }
    if (typeof obj === "object") {
      const res: any = {};
      Object.keys(obj).forEach((k) => {
        const v = cleanse(obj[k]);
        if (v !== undefined && v !== null && !(typeof v === "string" && v.trim() === "")) {
          res[k] = v;
        }
      });
      return Object.keys(res).length > 0 ? res : undefined;
    }
    if (typeof obj === "string") {
      return obj.trim() === "" ? undefined : obj;
    }
    return obj;
  };

  const cleaned = cleanse(update) as any;

  const event = await EventModel.findByIdAndUpdate(id, cleaned || {}, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  return event;
};

/** Delete event by id */
const deleteEventById = async (id: string) => {
  const event = await EventModel.findByIdAndDelete(id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  return event;
};

export {
  createEvent,
  getEventById,
  queryEvents,
  updateEventById,
  deleteEventById,
};
