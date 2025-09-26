import { verifyFlutterWavePaymentByReference } from "../service/registeredEventsAttends.service";
import catchAsync from "../utils/catchAsync";
import handleResponse from "../utils/handleResponse";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import ApiError from "../utils/ApiError";

export const flutterwaveWebhookController = catchAsync(
  async (req: Request, res: Response) => {
    const { event, data } = req.body;
    if (
      event !== "charge.completed" ||
      !data ||
      !data.tx_ref ||
      data.status !== "successful"
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Invalid webhook payload or event"
      );
    }

    const { tx_ref } = data;

    await verifyFlutterWavePaymentByReference(tx_ref);

    handleResponse(res, httpStatus.OK, "Webhook processed successfully");
  }
);
