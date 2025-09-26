import pkg from "winston";
import type { Logform, Logger } from "winston";
const { createLogger, format, transports } = pkg;
import { config } from "./index";

const enumerateErrorFormat: Logform.FormatWrap = format(
  (info: Logform.TransformableInfo): Logform.TransformableInfo | boolean => {
    if (info instanceof Error) {
      return Object.assign(info, { message: info.stack });
    }
    return info;
  }
);

const logger: Logger = createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: format.combine(
    enumerateErrorFormat(),
    config.env === "development" ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
