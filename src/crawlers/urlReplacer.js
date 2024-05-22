import { promises as fsPromises } from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import logger from "../utils/logger.js";

const substituirLinks = async (htmlFilePath, downloadsDir, novoDominio) => {
  try {
    const htmlContent = await fsPromises.readFile(htmlFilePath, "utf8");
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    const updateLink = (element, attribute) => {
      const url = element.getAttribute(attribute);
      if (url && url.startsWith("resource.aspx?id=")) {
        const resourceId = url.split("resource.aspx?id=")[1];
        const downloadedFile = path.join(
          downloadsDir,
          `resource-${resourceId}`,
        );
        if (fs.existsSync(downloadedFile)) {
          const newUrl = `${novoDominio}${path.basename(downloadedFile)}`;
          element.setAttribute(attribute, newUrl);
          logger.info(`Updated ${attribute} for ${url} to ${newUrl}`);
        }
      }
    };

    document.querySelectorAll("[href], [src]").forEach((element) => {
      if (element.hasAttribute("href")) {
        updateLink(element, "href");
      }
      if (element.hasAttribute("src")) {
        updateLink(element, "src");
      }
    });

    await fsPromises.writeFile(htmlFilePath, dom.serialize());
    logger.info(`Updated links in ${htmlFilePath}`);
  } catch (error) {
    logger.error(`Error updating links in ${htmlFilePath}: ${error.message}`);
  }
};

export { substituirLinks };
