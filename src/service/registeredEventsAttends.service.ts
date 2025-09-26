import RegisteredAttendModel, {
  type RegisteredAttendPayload,
} from "../model/registeredEventsAttends.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import getPaginatedData from "../utils/paginationQueries";
import { randomBytes } from "crypto";
import flutterwaveService from "../lib/flutterwave.lib";
import mongoose from "mongoose";
import { sendEmail } from "../lib/smtp";

const generatePassId = () => randomBytes(8).toString("hex");

const registerAttend = async (payload: RegisteredAttendPayload) => {
  const doc = await RegisteredAttendModel.create({ ...payload });

  // Fetch pricing details
  const PricingModel = mongoose.model("EventTicketPricing");
  const pricing = await PricingModel.findById(payload.eventTicketPricingId);
  if (!pricing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event ticket pricing not found");
  }

  // Generate tx_ref
  const tx_ref = randomBytes(16).toString("hex");

  // Create payment
  const paymentResponse = await flutterwaveService.createPayment({
    fullName: payload.fullName,
    email: payload.email,
    regId: doc._id.toString(),
    amount: pricing.price,
    currency: pricing.currency as "USD" | "NGN" | "CAD",
    tx_ref,
    ticketId: payload.eventTicketPricingId,
  });

  // Update doc with payment meta
  doc.paymentMeta = paymentResponse;
  doc.paymentReference = tx_ref;
  await doc.save();

  return doc;
};

const getAttendById = async (id: string) => {
  const doc = await RegisteredAttendModel.findById(id);
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, "Attend record not found");
  return doc;
};

const queryAttends = async (queryParams: any) => {
  return getPaginatedData({
    model: RegisteredAttendModel,
    filters: {},
    page: queryParams.page || 1,
    exclude: [],
  });
};

const verifyPassId = async (passId: string) => {
  const doc = await RegisteredAttendModel.findOne({ passId });
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, "Pass not found");
  doc.isPaymentSuccess = true;
  await doc.save();
  return doc;
};

const updateAttendById = async (
  id: string,
  update: Partial<RegisteredAttendPayload>
) => {
  const doc = await RegisteredAttendModel.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, "Attend record not found");
  return doc;
};

const deleteAttendById = async (id: string) => {
  const doc = await RegisteredAttendModel.findByIdAndDelete(id);
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, "Attend record not found");
  return doc;
};

// find and verify payment by tx_ref (paymentReference)
const verifyFlutterWavePaymentByReference = async (paymentReference: string) => {
  const doc = await RegisteredAttendModel.findOne({ paymentReference });
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, "Payment reference not found");

  const verification = await flutterwaveService.verifyPayment({ tx_ref: paymentReference });

  if (verification.data.status === 'successful') {
    doc.isPaymentSuccess = true;
    if (!doc.passId) {
      doc.passId = generatePassId();
    }

    await doc.save();

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${doc.passId}`;
    const html = `<p>Your pass ID: ${doc.passId}</p><img src="${qrCodeUrl}" alt="QR Code">`;
    await sendEmail(doc.email, 'Your Event Pass', html);

    // trigger GHL webhook

    return doc;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment not successful');
  }
}

export {
  registerAttend,
  getAttendById,
  queryAttends,
  verifyPassId,
  updateAttendById,
  deleteAttendById,
  verifyFlutterWavePaymentByReference,
};
