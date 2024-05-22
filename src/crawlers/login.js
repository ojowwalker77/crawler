import { chromium } from "playwright";

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

let page;
let browser;

const getPage = async () => {
  // to do: cachear page ou browser
  //if (page) {
  //  return { page, browser };
  // }
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    acceptDownloads: true,
  });
  page = await context.newPage();
  return { page, browser };
};

export default async function login(fileUrl) {
  const { page, browser } = await getPage();

  await page.goto(fileUrl, { waitUntil: "load", timeout: 60000 });
  console.log("Going to " + fileUrl);

  await page.click('text="Office 365"');
  await page.fill("input#i0116", email);
  console.log("Office 365 link clicked");
  console.log("Email filled");
  await page.click("#idSIButton9");
  console.log("First button clicked");
  await page.waitForSelector("input#i0118", { state: "visible" });
  await page.fill("input#i0118", password);
  console.log("Password filled");
  await page.click("#idSIButton9");
  console.log("Second button clicked");
  await page.waitForSelector("#idSIButton9", { state: "visible" });
  await page.click("#idSIButton9");
  console.log("Logged in successfully");

  return { page, browser };
}
