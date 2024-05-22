import scrapeContent from "./crawlers/getHtml.js";
import { contentAnalysis } from "./crawlers/contentAnalysis.js";
import {
  readLinksFromJson,
  saveFullUrlsToJson,
} from "./crawlers/urlBuilder.js";
import { substituirLinks } from "./crawlers/urlReplacer.js";
import { baixarConteudo } from "./crawlers/contentDownloader.js";
import logger from "./utils/logger.js";
import { ensureDir } from "./utils/fileManager.js";
import { config } from "./config/config.js";
import path from "path";
import fs from "fs-extra";

//
// adicionar urls das paginas
// pode ser quantas quiser
// ex: ["science/resources", "science/exemplo", "exemplo/exemplo"]
//

const urls = ["https://url.com"];

const runCrawlers = async () => {
  ensureDir(config.htmlOutputDir);
  ensureDir("content/downloads");

  for (const url of urls) {
    logger.info(`Starting crawl for URL: ${url}`);

    await scrapeContent(url);

    const htmlFilePath = path.join(
      config.htmlOutputDir,
      `${path.basename(url)}.html`,
    );
    const analysisResult = contentAnalysis(htmlFilePath);
    logger.info(
      `Analysis result for ${htmlFilePath}: ${JSON.stringify(analysisResult)}`,
    );

    const linksJsonPath = "output_links.json";
    fs.writeJsonSync(linksJsonPath, analysisResult.links, { spaces: 2 });
    logger.info(`Saved analysis links to JSON: ${linksJsonPath}`);

    const pdfLinks = readLinksFromJson(linksJsonPath);
    const fullUrls = pdfLinks;
    const realUrlsJsonPath = "real_urls.json";
    saveFullUrlsToJson(fullUrls, realUrlsJsonPath);

    const downloadUrls = fullUrls.map((link) => ({ url: link.url }));
    await baixarConteudo(downloadUrls, "content/downloads");

    await substituirLinks(
      htmlFilePath,
      "content/downloads",

      //
      // Substituir pelo path da folder em questão
      //
      //

      "<NEW_URL>",
    );

    logger.info(`Process completed successfully for URL: ${url}`);
  }
  logger.info("Log analysis completed successfully");
};

export default runCrawlers;
