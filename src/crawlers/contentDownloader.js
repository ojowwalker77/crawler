import { promises as fsPromises } from "fs";
import path from "path";

import logger from "../utils/logger.js";
import login from "./login.js";

export const baixarConteudo = async (urls, diretorioDestino) => {
  try {
    await fsPromises.mkdir(diretorioDestino, { recursive: true });
    logger.info(`Ensured directory exists: ${diretorioDestino}`);

    //
    // altere esse valor para quantos quiser
    // depende de RAM
    //

    const maxConcurrentDownloads = 3;
    let currentIndex = 0;

    const downloadContent = async ({ url: fileUrl }) => {
      try {
        const { page } = await login(fileUrl);

        await page.waitForLoadState("networkidle");

        const pageContent = await page.content();
        await fsPromises.writeFile("pageContent.html", pageContent);
        console.log("Captured page content for debugging");

        const fileName = await page.$eval(
          'h2[data-testid="download-resource-title"]',
          (el) => el.textContent.trim(),
        );
        console.log(`File name determined from page: ${fileName}`);

        const downloadButton = await page.$(
          'button[data-testid="download-resource-download"]',
        );
        if (downloadButton) {
          const [download] = await Promise.all([
            page.waitForEvent("download"),
            downloadButton.click(),
          ]);

          const filePath = path.join(diretorioDestino, fileName);
          await download.saveAs(filePath);
          console.log(`Downloaded ${filePath}`);
          logger.info(`Downloaded content from ${fileUrl} to ${filePath}`);
        } else {
          throw new Error("Download button not found");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        logger.error(`Error downloading ${fileUrl}: ${error.message}`);
      }
    };

    const runDownloads = async () => {
      const downloadQueue = [];
      while (currentIndex < urls.length) {
        const activeDownloads = [];
        for (
          let i = 0;
          i < maxConcurrentDownloads && currentIndex < urls.length;
          i++, currentIndex++
        ) {
          activeDownloads.push(downloadContent(urls[currentIndex]));
        }
        downloadQueue.push(Promise.all(activeDownloads));
        await Promise.all(activeDownloads);
      }
      await Promise.all(downloadQueue);
    };

    await runDownloads();
  } catch (error) {
    logger.error(`Error in baixarConteudo: ${error.message}`);
  }
};
