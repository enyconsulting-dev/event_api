import "dotenv/config";
import express, { Router, type Application } from "express";
import session from "express-session";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import httpStatus from "http-status";
import { config } from "./config/index";
import routes from "./route/v1/index";
import "./lib/firebase";
import "./lib/smtp";
import { connectToDatabase } from "./lib/database";
import ApiError from "./utils/ApiError";
import { errorConverter, errorHandler } from "./middleware/error";
import type { Request, Response } from "express";

declare global {
  // eslint-disable-next-line no-var
  var router: Router;
  var catchAsync: any;
  var getId: any;
  var statusCodeMap: any;
  var formatResponse: any;
  var handleResponse: any;
  var httpStatus: typeof import("http-status");
}

const app: Application = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.env === "production" },
  })
);

if (config.env !== "production" && config.env !== "test") {
  app.use(
    morgan("combined", {
      stream: {
        write: (message: string) => {
          // Log to a file or external service
          console.log(message.trim());
        },
      },
    })
  );
}

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectToDatabase();

app.use((req, res, next) => {
  // console.log(`Request size: ${req.headers['content-length']} bytes`);
  // console.log(`Headers:`, req.headers);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;

