import express, { Router } from "express";
import validate from "../../middleware/validate";
import {
  createLocationController,
  getLocationController,
  queryLocationsController,
  updateLocationController,
  deleteLocationController,
} from "../../controller/location.controller";
import {
  createLocationValidation,
  updateLocationValidation,
  getLocationValidation,
  deleteLocationValidation,
  queryLocationValidation,
} from "../../validation/locationValid";

const router: Router = express.Router();

router.post("/", validate(createLocationValidation), createLocationController);
router.get("/", validate(queryLocationValidation), queryLocationsController);
router.get("/:id", validate(getLocationValidation), getLocationController);
router.patch("/:id", validate(updateLocationValidation), updateLocationController);
router.delete("/:id", validate(deleteLocationValidation), deleteLocationController);

export default router;