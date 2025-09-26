import {
  createPricing,
  getPricingById,
  queryPricings,
  updatePricingById,
  deletePricingById,
} from "../service/eventTicketPrcing.service";
import catchAsync from "../utils/catchAsync";
import handleResponse from "../utils/handleResponse";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import ApiError from "../utils/ApiError";

export const createPricingController = catchAsync(
  async (req: Request, res: Response) => {
    const pricing = await createPricing(req.body);
    handleResponse(
      res,
      httpStatus.CREATED,
      "Pricing created successfully",
      pricing
    );
  }
);

export const getPricingController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
    }
    const pricing = await getPricingById(id);
    handleResponse(
      res,
      httpStatus.OK,
      "Pricing retrieved successfully",
      pricing
    );
  }
);

export const queryPricingsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await queryPricings(req.query);
    handleResponse(res, result.code, result.message, result.data);
  }
);

export const updatePricingController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
    }
    const updated = await updatePricingById(id, req.body);
    handleResponse(res, httpStatus.OK, "Pricing updated successfully", updated);
  }
);

export const deletePricingController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "id is required");
    }
    await deletePricingById(id);
    handleResponse(res, httpStatus.OK, "Pricing deleted successfully", null);
  }
);
