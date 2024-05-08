import { promises as fsPromises } from "fs";
import { chromium } from "playwright";

async function scrapeContent(url, pdfUrl, name, email, password) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(pdfUrl, { waitUntil: "load", timeout: 60000 });
    await Promise.all([page.click('text="Office 365"')]);
    await page.fill("input#i0116", email);
    console.log("Office 365 link clicked");
    console.log("Email filled");
    await Promise.all([page.click("#idSIButton9")]);
    console.log("First button clicked");
    await page.waitForSelector("input#i0118", { state: "visible" });
    await page.fill("input#i0118", password);
    console.log("Password filled");
    await Promise.all([page.click("#idSIButton9")]);
    console.log("Second button clicked");
    await page.waitForSelector("#idSIButton9", { state: "visible" });
    await page.click("#idSIButton9");
    console.log("Logged in successfully");

    await page.waitForSelector(
      'button[data-testid="download-resource-download"]',
    );
    await page.click('button[data-testid="download-resource-download"]');
    console.log("Download button clicked");

    console.log("Download completed");

    const pdfFileName = name;
    const pdfBuffer = await page.pdf();
    await fsPromises.writeFile(pdfFileName, pdfBuffer);
    console.log(`Downloaded ${pdfFileName}`);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await browser.close();
  }
}

(async () => {
  const realUrlsJson = await fsPromises.readFile("real_urls.json", "utf-8");
  const realUrls = JSON.parse(realUrlsJson);

  const email = "bigbrain@stpauls.br";
  const password = "B1g#0739@";

  let totalDownloads = 0;
  let errorCount = 0;
  const downloadedFiles = [];

  for (const { full_url: pdfUrl, name } of realUrls) {
    try {
      await scrapeContent(
        "https://senior-stpauls.fireflycloud.net/",
        pdfUrl,
        name,
        email,
        password,
      );
      totalDownloads++;
      downloadedFiles.push(name);
    } catch (error) {
      console.error(`Error downloading ${name}:`, error);
      errorCount++;
    }
  }

  console.log("Downloaded files:");
  downloadedFiles.forEach((file, index) =>
    console.log(`${index + 1}. ${file}`),
  );
  console.log(`Total downloads: ${totalDownloads}`);
  console.log(`Total errors: ${errorCount}`);
})();
