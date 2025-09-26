import mongoose, { Document, Schema, Types } from "mongoose";
import ApiError from "../utils/ApiError";

export interface EventTicketPricingDocument extends Document {
  eventId: Types.ObjectId;
  locationId: Types.ObjectId;
  price: number;
  currency: string;
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventTicketPricingPayload {
  eventId: string;
  locationId: string;
  price: number;
  currency: string;
  benefits: string[];
}

const EventTicketPricingSchema = new Schema<EventTicketPricingDocument>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    locationId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, enum: ["USD", "EUR", "NGN"] },
    benefits: { type: [String], default: [] },
  },
  { timestamps: true }
);

EventTicketPricingSchema.pre("save", async function (this: EventTicketPricingDocument, next) {
  try {
    const EventModel = mongoose.model("Event");
    const event = await EventModel.findById(this.eventId);

    if (!event) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Referenced event does not exist"
      );
    }

    if (this.locationId) {
      const locationExists = event.locations.some(
        (location: any) =>
          location._id.toString() === this.locationId.toString()
      );

      if (!locationExists) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "Referenced locationId does not exist in the event"
        );
      }
    }

    next();
  } catch (error: any) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Referenced locationId does not exist in the event"
    );
  }
});

const EventTicketPricingModel = mongoose.model<EventTicketPricingDocument>(
  "EventTicketPricing",
  EventTicketPricingSchema
);

export default EventTicketPricingModel;
