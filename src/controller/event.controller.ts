import {
  createEvent,
  getEventById,
  queryEvents,
  updateEventById,
  deleteEventById,
} from "../service/event.service";

import type { Request, Response } from "express";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import handleResponse from "../utils/handleResponse";
import httpStatus from "http-status";

const createEventController = catchAsync(
  async (req: Request, res: Response) => {
    const event = await createEvent(req.body);
    handleResponse(
      res,
      httpStatus.CREATED,
      "Event created successfully",
      event
    );
  }
);

const getEventController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
  }
  const event = await getEventById(id);
  handleResponse(res, httpStatus.OK, "Event retrieved successfully", event);
});

const queryEventsController = catchAsync(async (req: Request, res: Response) => {
  const result = await queryEvents(req.query);
  handleResponse(res, result.code, result.message, result.data);
});

const updateEventController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
  }
  const updated = await updateEventById(id, req.body);
  handleResponse(res, httpStatus.OK, "Event updated successfully", updated);
});

const deleteEventController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
  }
  await deleteEventById(id);
  handleResponse(res, httpStatus.OK, "Event deleted successfully", null);
});

export {
  createEventController,
  getEventController,
  queryEventsController,
  updateEventController,
  deleteEventController,
};
