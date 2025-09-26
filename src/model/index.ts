import EventModel from "./event.model";
import LocationModel from "./location.model";
import type { LocationDocument, CreateLocationPayload } from "./location.model";
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

export { EventModel, LocationModel, EventTicketPricingModel, RegisteredAttendModel };

export type {
  LocationDocument,
  EventTicketPricingDocument,
  EventTicketPricingPayload,
  RegisteredAttendDocument,
  RegisteredAttendPayload,
  CreateLocationPayload
};
