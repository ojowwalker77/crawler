import runCrawlers from "./main.js";
import logger from "./utils/logger.js";

(async () => {
  try {
    logger.info("Starting the web crawler");
    await runCrawlers();
    logger.info("Web crawler finished successfully");
  } catch (error) {
    logger.error(`Web crawler failed: ${error.message}`);
  }
})();
