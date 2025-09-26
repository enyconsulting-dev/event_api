import axios from "axios";
import ApiError from "../utils/ApiError";

interface FlutterPaymentBodyType {
  fullName: string;
  email: string;
  amount: number;
  currency: "USD" | "NGN" | "CAD";
  tx_ref: string;
  ticketId: string;
  regId: string;
}

interface FlutterPaymentVerifyType {
  tx_ref: string;
}

const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";
const FLUTTERWAVE_SECRET_KEY = "FLWSECK_TEST-SANDBOXDEMOKEY-X";

const flutterwaveService = {
  createPayment: async ({
    fullName,
    email,
    regId,
    amount,
    currency,
    tx_ref,
    ticketId,
  }: FlutterPaymentBodyType) => {
    const options = {
      method: "POST",
      url: `${FLUTTERWAVE_BASE_URL}/payments`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        amount,
        tx_ref,
        currency,
        redirect_url: "https://www.businessanalysisschool.com",
        customer: { email, name: fullName },
        customizations: {
          title: "Business Analytics Summit",
          logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
        },
        max_retry_attempt: 5,
        payment_options: "card, ussd, mobilemoneyghana",
        meta: { ticket_id: ticketId, registration_id: regId },
      },
    };
    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error: any) {
      console.log(error);
      throw new ApiError(
        500,
        "Flutterwave payment initiation failed: " + error.message
      );
    }
  },
  verifyPayment: async ({ tx_ref }: FlutterPaymentVerifyType) => {
    const options = {
      method: "GET",
      url: `${FLUTTERWAVE_BASE_URL}transactions/verify_by_reference?tx_ref=${encodeURIComponent(
        tx_ref
      )}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error: any) {
      throw new ApiError(
        500,
        "Flutterwave payment verification failed: " + error.message
      );
    }
  },
};

export default flutterwaveService;
