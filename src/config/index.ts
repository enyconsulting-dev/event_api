import Joi from "joi";
import dotenv from "dotenv";

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number(),
    PING: Joi.string().optional(),

    MONGODB_URI: Joi.string(),

    JWT_SECRET: Joi.string(),
    SESSION_SECRET: Joi.string(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number(),
    JWT_REFRESH_EXPIRATION_MINUTES: Joi.number(),

    SMTP_HOST: Joi.string(),
    SMTP_PORT: Joi.number(),
    SMTP_MAIL: Joi.string(),
    SMTP_PASSWORD: Joi.string(),
    EMAIL_FROM: Joi.string(),

    API_KEY: Joi.string(),
    AUTH_DOMAIN: Joi.string(),
    DATABASE_URL: Joi.string(),
    PROJECT_ID: Joi.string(),
    STORAGE_BUCKET: Joi.string(),
    MESSAGING_SENDER_ID: Joi.string(),
    APP_ID: Joi.string(),
    MEASUREMENT_ID: Joi.string(),

    SOCKET_ORIGIN: Joi.string().optional(),

    GOOGLE_CLIENT_ID: Joi.string(),
    GOOGLE_CLIENT_SECRET: Joi.string(),
    GOOGLE_CLIENT_URI: Joi.string(),

    SERVER_ORIGIN: Joi.string(),
    FRONTEND_ORIGIN: Joi.string(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  port: envVars.PORT,
  env: envVars.NODE_ENV,

  mongoose: {
    uri: envVars.MONGODB_URI,
  },

  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationMinutes: envVars.JWT_REFRESH_EXPIRATION_MINUTES,
  },

  session: {
    secret: envVars.SESSION_SECRET,
  },

  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        username: envVars.SMTP_MAIL,
        password: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },

  firebase: {
    apiKey: envVars.API_KEY,
    authDomain: envVars.AUTH_DOMAIN,
    databaseUrl: envVars.DATABASE_URL,
    projectId: envVars.PROJECT_ID,
    storageBucket: envVars.STORAGE_BUCKET,
    messagingSenderId: envVars.MESSAGING_SENDER_ID,
    appId: envVars.APP_ID,
    measurementId: envVars.MEASUREMENT_ID,
  },

  ping: {
    url: envVars.PING_URL,
  },

  socket: {
    origin: envVars.SOCKET_ORIGIN,
  },

  google: {
    client_id: envVars.GOOGLE_CLIENT_ID,
    client_secret: envVars.GOOGLE_CLIENT_SECRET,
    client_uri: envVars.GOOGLE_CLIENT_URI,
  },

  protocol: {
    server_origin: envVars.SERVER_ORIGIN,
    frontend_origin: envVars.FRONTEND_ORIGIN,
  },
};
