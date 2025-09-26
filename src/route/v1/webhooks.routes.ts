import express from "express";
import { flutterwaveWebhookController } from "../../controller/webhook.controller";

const router = express.Router();

router.post("/flutterwave", flutterwaveWebhookController);

export default router;
