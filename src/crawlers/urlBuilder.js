import fs from "fs-extra";
import logger from "../utils/logger.js";

export const readLinksFromJson = (jsonFilePath) => {
  try {
    if (!fs.existsSync(jsonFilePath)) {
      throw new Error(`File not found: ${jsonFilePath}`);
    }
    const links = fs.readJsonSync(jsonFilePath);
    logger.info(`Read links from JSON: ${jsonFilePath}`);
    return links;
  } catch (error) {
    logger.error(`Error reading JSON file: ${error.message}`);
    return [];
  }
};

export const constructFullUrls = (baseUrl, links) => {
  const fullUrls = links.map((link) => {
    const urlObj = new URL(link.url, baseUrl);
    return {
      ...link,
      full_url: urlObj.href,
    };
  });
  logger.info("Constructed full URLs");
  return fullUrls;
};

export const saveFullUrlsToJson = (fullUrls, jsonFilePath) => {
  try {
    fs.writeJsonSync(jsonFilePath, fullUrls, { spaces: 2 });
    logger.info(`Saved full URLs to JSON: ${jsonFilePath}`);
  } catch (error) {
    logger.error(`Error saving JSON file: ${error.message}`);
  }
};
