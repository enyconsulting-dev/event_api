import express, { Router } from "express";
import validate from "../../middleware/validate";
import {
  createEventController,
  getEventController,
  queryEventsController,
  updateEventController,
  deleteEventController,
} from "../../controller/event.controller";
import {
  createEventValidation,
  updateEventValidation,
  queryEventValidation,
  getEventValidation,
  deleteEventValidation,
} from "../../validation/eventValid";

const router: Router = express.Router();

router.post("/", validate(createEventValidation), createEventController);
router.get("/", validate(queryEventValidation), queryEventsController);
router.get("/:id", validate(getEventValidation), getEventController);
router.patch("/:id", validate(updateEventValidation), updateEventController);
router.delete("/:id", validate(deleteEventValidation), deleteEventController);

export default router;
