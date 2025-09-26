import mongoose from "mongoose";
import { config } from "../config/index";

/**
 * Connect to MongoDB with retry and exponential backoff.
 * Returns a promise that resolves when connected or rejects after exhausting retries.
 */
export async function connectToDatabase(): Promise<void> {
  const uri: string = config.mongoose.uri;

  const MAX_RETRIES = 5;
  const BASE_DELAY_MS = 1000; // 1s base

  // Keep the connection event handlers for runtime errors and successful connect logging.
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri);
      // Connected successfully
      return;
    } catch (err) {
      const isLastAttempt = attempt === MAX_RETRIES;
      console.error(`MongoDB connection attempt ${attempt + 1} failed:`, err);

      if (isLastAttempt) {
        console.error(
          `Could not connect to MongoDB after ${MAX_RETRIES + 1} attempts.`
        );
        // Re-throw so callers can decide how to handle fatal failures
        throw err;
      }

      // Exponential backoff with a cap
      const delay = Math.min(10000, BASE_DELAY_MS * Math.pow(2, attempt));
      console.log(`Retrying MongoDB connection in ${delay} ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
