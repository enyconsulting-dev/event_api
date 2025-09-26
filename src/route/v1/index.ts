import express, { Router } from "express";
import eventRoutes from "./event.routes";
import eventPricingRoutes from "./eventTicketPricing.routes";
import registeredAttendsRoutes from "./registeredEventsAttends.routes";
import webhooksRoutes from "./webhooks.routes";
import locationRoutes from "./location.routes";

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/events",
    route: eventRoutes,
  },
  {
    path: "/event-pricing",
    route: eventPricingRoutes,
  },
  {
    path: "/events-attends",
    route: registeredAttendsRoutes,
  },
  {
    path: "/webhooks",
    route: webhooksRoutes,
  },
  {
    path: "/event-locations",
    route: locationRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
