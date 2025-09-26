import express, { Router } from "express";
import validate from "../../middleware/validate";
import {
  registerAttendController,
  getAttendController,
  queryAttendsController,
  verifyPassController,
  updateAttendController,
  deleteAttendController,
} from "../../controller/registeredEventsAttends.controller";
import {
  registerAttendValidation,
  getAttendValidation,
  updateAttendValidation,
  deleteAttendValidation,
  queryAttendValidation,
  verifyPassValidation,
} from "../../validation/registeredEventsAttendsValid";

const router: Router = express.Router();

router.post("/", validate(registerAttendValidation), registerAttendController);
router.get("/", validate(queryAttendValidation), queryAttendsController);
router.get("/:id", validate(getAttendValidation), getAttendController);
router.get("/verify/:passId", validate(verifyPassValidation), verifyPassController);
// router.patch("/:id", validate(updateAttendValidation), updateAttendController);
router.delete("/:id", validate(deleteAttendValidation), deleteAttendController);

export default router;
