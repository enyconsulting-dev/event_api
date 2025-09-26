import EventModel from "./event.model";
import type { Location } from "./event.model";
import EventTicketPricingModel from "./eventTicketPricing.model";
import type {
  EventTicketPricingDocument,
  EventTicketPricingPayload,
} from "./eventTicketPricing.model";
import RegisteredAttendModel from "./registeredEventsAttends.model";
import type {
  RegisteredAttendDocument,
  RegisteredAttendPayload,
} from "./registeredEventsAttends.model";

export { EventModel, EventTicketPricingModel, RegisteredAttendModel };

export type {
  Location,
  EventTicketPricingDocument,
  EventTicketPricingPayload,
  RegisteredAttendDocument,
  RegisteredAttendPayload,
};
