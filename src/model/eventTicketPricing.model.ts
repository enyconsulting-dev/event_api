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
    locationId: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, enum: ["USD", "EUR", "NGN"] },
    benefits: { type: [String], default: [] },
  },
  { timestamps: true }
);

EventTicketPricingSchema.pre("save", async function (this: EventTicketPricingDocument, next) {
  try {
    const EventModel = mongoose.model("Event");
    const LocationModel = mongoose.model("Location");

    const event = await EventModel.findById(this.eventId);
    if (!event) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Referenced event does not exist"
      );
    }

    const location = await LocationModel.findById(this.locationId);
    if (!location) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Referenced location does not exist"
      );
    }

    if (location.eventId.toString() !== this.eventId.toString()) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Location does not belong to the specified event"
      );
    }

    next();
  } catch (error: any) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      error.message || "Validation error"
    );
  }
});

const EventTicketPricingModel = mongoose.model<EventTicketPricingDocument>(
  "EventTicketPricing",
  EventTicketPricingSchema
);

export default EventTicketPricingModel;
