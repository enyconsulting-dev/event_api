import mongoose, { Document, Schema, Types } from "mongoose";
import ApiError from "../utils/ApiError";

export interface LocationDocument extends Document {
  eventId: Types.ObjectId;
  address?: string;
  state: string;
  country: string;
  startDate: Date;
  endDate?: Date;
  coordinates?: [number, number];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLocationPayload {
  eventId: string;
  address?: string;
  state: string;
  country: string;
  startDate: Date;
  endDate?: Date;
  coordinates?: [number, number];
}

const LocationSchema = new Schema<LocationDocument>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    address: { type: String },
    state: { type: String, required: true },
    country: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    coordinates: {
      type: [Number],
      default: []
    },
  },
  { timestamps: true }
);

LocationSchema.pre("save", async function (next) {
  try {
    const EventModel = mongoose.model("Event");
    const event = await EventModel.findById(this.eventId);

    if (!event) {
      throw new ApiError(404, "Referenced event does not exist");
    }

    next();
  } catch (error: any) {
    throw new ApiError(404, "Referenced event does not exist");
  }
});

const LocationModel = mongoose.model<LocationDocument>("Location", LocationSchema);

export default LocationModel;