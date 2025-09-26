import mongoose, { Document, Schema, Types } from "mongoose";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

export interface RegisteredAttendDocument extends Document {
  _id: Types.ObjectId;
  eventTicketPricingId: Types.ObjectId;
  fullName: string;
  email: string;
  mobileNumber?: string;
  paymentReference?: string;
  isPaymentSuccess: boolean;
  passId: string;
  paymentMeta?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisteredAttendPayload {
  eventTicketPricingId: string;
  fullName: string;
  email: string;
  mobileNumber?: string;
  paymentReference?: string;
}

const RegisteredAttendSchema = new Schema<RegisteredAttendDocument>(
  {
    eventTicketPricingId: { type: Schema.Types.ObjectId, ref: "EventTicketPricing", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String },
    paymentReference: { type: String },
    isPaymentSuccess: { type: Boolean, default: false },
    passId: { type: String, required: false, unique: true },
    paymentMeta: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Before saving, ensure referenced pricing exists
RegisteredAttendSchema.pre("save", async function (next) {
  try {
    const PricingModel = mongoose.model("EventTicketPricing");
    const pricing = await PricingModel.findById(this.eventTicketPricingId);
    if (!pricing) {
      throw new ApiError(httpStatus.NOT_FOUND, "Referenced pricing does not exist");
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const RegisteredAttendModel = mongoose.model<RegisteredAttendDocument>(
  "RegisteredAttend",
  RegisteredAttendSchema
);

export default RegisteredAttendModel;
