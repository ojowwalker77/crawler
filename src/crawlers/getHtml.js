import { config } from "../config/config.js";
import { ensureDir, writeFile } from "../utils/fileManager.js";
import logger from "../utils/logger.js";
import path from "path";
import login from "./login.js";

const scrapeContent = async (relativeUrl) => {
  try {
    const { page, browser } = await login(config.baseUrl + relativeUrl);

    logger.info("Navigated to page");

    await page.waitForTimeout(10000);
    logger.info("Navigation and page load complete");

    const content = await page.$$eval(".ff-post-content", (divs) =>
      divs.map((div) => div.innerHTML),
    );
    if (content.length > 0) {
      logger.info(
        `Found ${content.length} elements with class .ff-post-content`,
      );
    } else {
      logger.warn("No elements found with class .ff-post-content");
    }

    const resultHtml = `
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <base href="https://stpaulsbrsp.sharepoint.com/" />
          <link rel="stylesheet" type="text/css" href=":u:/r/sites/portal/SiteAssets/contents/index.css?csf=1&web=1&e=YlIbYf" />
        </head>
        <body>
          ${content.join("")}
        </body>
      </html>
    `;

    const fileName = `${path.basename(relativeUrl)}.html`;
    writeFile(fileName, resultHtml);
    logger.info(`Content saved to ${fileName}`);
  } catch (error) {
    logger.error(`Error occurred: ${error.message}`);
  }
};

export default scrapeContent;
