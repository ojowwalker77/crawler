import { createLogger, format, transports } from "winston";
import { config } from "../config/config.js";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: config.logFilePath }),
  ],
});

export default logger;
