import fs from "fs-extra";
import path from "path";
import { config } from "../config/config.js";
import logger from "./logger.js";

export const ensureDir = (dirPath) => {
  fs.ensureDirSync(dirPath);
  logger.info(`Ensured directory exists: ${dirPath}`);
};

export const writeFile = (fileName, content) => {
  const filePath = path.join(config.htmlOutputDir, fileName);
  fs.writeFileSync(filePath, content, "utf8");
  logger.info(`File written to ${filePath}`);
};
