import { chromium } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function ensureDir(dirpath) {
  if (!existsSync(dirpath)) {
    mkdirSync(dirpath, { recursive: true });
  }
}

async function scrapeContent(url) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    await Promise.all([page.click('text="Office 365"')]);
    await page.fill("input#i0116", "bigbrain@stpauls.br");
    console.log("Office 365 link clicked");
    console.log("Email filled");
    await Promise.all([page.click("#idSIButton9")]);
    console.log("First button clicked");
    await page.waitForSelector("input#i0118", { state: "visible" });
    await page.fill("input#i0118", "B1g#0739@");
    console.log("Password filled");
    await Promise.all([page.click("#idSIButton9")]);
    console.log("Second button clicked");
    await page.waitForSelector("#idSIButton9", { state: "visible" });
    await page.click("#idSIButton9");
    console.log("Logged in successfully");

    await page.waitForNavigation({ waitUntil: "networkidle" });

    const content = await page.$$eval(".ff-post-content", (divs) =>
      divs.map((div) => div.innerHTML),
    );
    const resultHtml = `
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <base href="https://stpaulsbrsp.sharepoint.com/" />
          <link rel="stylesheet" type="text/css" href=":u:/r/sites/portal/SiteAssets/contents/index.css?csf=1&web=1&e=YlIbYf" />
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;

    const dirPath = join(__dirname, "content", "htmls");
    const filePath = join(dirPath, "output.html");

    ensureDir(dirPath);

    writeFileSync(filePath, resultHtml, "utf-8");
    console.log(`File written to ${filePath}`);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await browser.close();
  }
}

scrapeContent("<URL>");
