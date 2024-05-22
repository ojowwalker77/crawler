import fs from "fs-extra";
import path from "path";
import { JSDOM } from "jsdom";
import logger from "../utils/logger.js";

export const contentAnalysis = (htmlFilePath) => {
  try {
    const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    const links = Array.from(
      document.querySelectorAll('a[href*="resource.aspx"]'),
    ).map((link) => {
      const url = link.href;
      const title = link.textContent.trim();
      const ext = path.extname(title).split("?")[0];

      const match = url.match(/resource\.aspx\?id=(\d+)/);
      const resourceId = match ? match[1] : null;
      const fullUrl = resourceId
        ? `https://senior-stpauls.fireflycloud.net/resource.aspx?id=${resourceId}`
        : url;

      return {
        title,
        url: fullUrl,
        name: title,
        fileType: ext ? ext.substring(1) : "unknown",
      };
    });

    const iframes = Array.from(document.querySelectorAll("iframe[src]")).map(
      (iframe) => iframe.src,
    );
    const images = Array.from(document.querySelectorAll("img[src]")).map(
      (img) => img.src,
    );
    const pdfs = links
      .filter((link) => link.fileType === "pdf")
      .map((link) => link.url);

    logger.info(`Content analysis completed for ${htmlFilePath}`);

    return {
      links,
      iframes,
      images,
      pdfs,
    };
  } catch (error) {
    logger.error(`Error in contentAnalysis: ${error.message}`);
    return {};
  }
};
