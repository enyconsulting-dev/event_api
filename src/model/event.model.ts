import mongoose, { Document, Schema } from "mongoose";

export interface EventDocument extends Document {
  title: string;
  description?: string;
  eventImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    eventImage: { type: String },
  },
  { timestamps: true }
);

const EventModel = mongoose.model<EventDocument>("Event", EventSchema);

export default EventModel;
