import express from "express";
import eventRoutes from "./event.routes";
import eventPricingRoutes from "./eventTicketPricing.routes";
import registeredAttendsRoutes from "./registeredEventsAttends.routes";
import webhooksRoutes from "./webhooks.routes";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/events",
    route: eventRoutes,
  },
  {
    path: "/events/pricing",
    route: eventPricingRoutes,
  },
  {
    path: "/events/attends",
    route: registeredAttendsRoutes,
  },
  {
    path: "/webhooks",
    route: webhooksRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
