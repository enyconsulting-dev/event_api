import mongoose, { Document, Schema } from "mongoose";

export interface Location {
  name?: string;
  address?: string;
  state: string;
  country: string;
  startDate: Date;
  endDate?: Date;
  coordinates?: [number, number];
}

export interface EventDocument extends Document {
  title: string;
  description?: string;
  eventImage?: string;
  locations: Location[];
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<Location>(
  {
    name: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    address: { type: String },
    state: { type: String },
    country: { type: String },
    coordinates: {
      type: [Number],
      required: false,
      validate: {
        validator: function (v: number[]) {
          return Array.isArray(v) && v.length === 2;
        },
        message: "coordinates must be an array of two numbers [lng, lat]",
      },
    },
  },
  { _id: true }
);

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    eventImage: { type: String },
    locations: {
      type: [LocationSchema],
      default: [],
      validate: {
        validator: function (v: Location[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "events must have at least one location",
      },
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model<EventDocument>("Event", EventSchema);

export default EventModel;
