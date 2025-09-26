import {
  registerAttend,
  getAttendById,
  queryAttends,
  verifyPassId,
  updateAttendById,
  deleteAttendById,
} from "../service/registeredEventsAttends.service";
import catchAsync from "../utils/catchAsync";
import handleResponse from "../utils/handleResponse";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import ApiError from "../utils/ApiError";

export const registerAttendController = catchAsync(
  async (req: Request, res: Response) => {
    const doc = await registerAttend(req.body);
    handleResponse(res, httpStatus.CREATED, "Registration created", doc);
  }
);

export const getAttendController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
    }
    const doc = await getAttendById(id);
    handleResponse(res, httpStatus.OK, "Attend retrieved", doc);
  }
);

export const queryAttendsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await queryAttends(req.query);
    return res.status(result.code === 200 ? 200 : 500).send(result);
  }
);

export const verifyPassController = catchAsync(
  async (req: Request, res: Response) => {
    const { passId } = req.params;
    if (!passId) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
    }
    const doc = await verifyPassId(passId);
    handleResponse(res, httpStatus.OK, "Pass verified", doc);
  }
);

export const updateAttendController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
     if (!id) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
    }
    const updated = await updateAttendById(id, req.body);
    handleResponse(res, httpStatus.OK, "Attend updated", updated);
  }
);

export const deleteAttendController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
     if (!id) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
    }
    await deleteAttendById(id);
    handleResponse(res, httpStatus.OK, "Attend deleted", null);
  }
);
