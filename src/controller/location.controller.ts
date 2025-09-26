import {
  createLocation,
  getLocationById,
  queryLocations,
  updateLocationById,
  deleteLocationById,
} from "../service/location.service";
import catchAsync from "../utils/catchAsync";
import handleResponse from "../utils/handleResponse";
import httpStatus from "http-status";

export const createLocationController = catchAsync(
  async (req: any, res: any) => {
    const doc = await createLocation(req.body);
    handleResponse(res, httpStatus.CREATED, "Location created", doc);
  }
);

export const getLocationController = catchAsync(
  async (req: any, res: any) => {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }
    const doc = await getLocationById(id);
    handleResponse(res, httpStatus.OK, "Location retrieved", doc);
  }
);

export const queryLocationsController = catchAsync(
  async (req: any, res: any) => {
    const result = await queryLocations(req.query);
    return res.status(result.code === 200 ? 200 : 500).send(result);
  }
);

export const updateLocationController = catchAsync(
  async (req: any, res: any) => {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }
    const updated = await updateLocationById(id, req.body);
    handleResponse(res, httpStatus.OK, "Location updated", updated);
  }
);

export const deleteLocationController = catchAsync(
  async (req: any, res: any) => {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }
    await deleteLocationById(id);
    handleResponse(res, httpStatus.OK, "Location deleted", null);
  }
);