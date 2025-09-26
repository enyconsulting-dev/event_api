import express, { Router } from "express";
import { flutterwaveWebhookController } from "../../controller/webhook.controller";

const router: Router = express.Router();

router.post("/flutterwave", flutterwaveWebhookController);

export default router;
