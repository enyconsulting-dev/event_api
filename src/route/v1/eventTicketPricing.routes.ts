import express, { Router } from "express";
import validate from "../../middleware/validate";
import {
  createPricingController,
  getPricingController,
  queryPricingsController,
  updatePricingController,
  deletePricingController,
} from "../../controller/eventTicketPrcing.controller";
import {
  createPricingValidation,
  updatePricingValidation,
  getPricingValidation,
  deletePricingValidation,
  queryPricingValidation,
} from "../../validation/eventTicketPricingValid";

const router: Router = express.Router();

router.post("/", validate(createPricingValidation), createPricingController);
router.get("/", validate(queryPricingValidation), queryPricingsController);
router.get("/:id", validate(getPricingValidation), getPricingController);
router.patch("/:id", validate(updatePricingValidation), updatePricingController);
router.delete("/:id", validate(deletePricingValidation), deletePricingController);

export default router;
