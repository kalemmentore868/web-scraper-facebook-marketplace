import * as puppeteer from "puppeteer";

let browser: puppeteer.Browser;

const HEADLESS = false;

async function main() {
  browser = await puppeteer.launch({ headless: HEADLESS });

  const page = await browser.newPage();

  const search = "iphone";

  const url = `https://www.facebook.com/marketplace/116087261735365/search?daysSinceListed=30&sortBy=best_match&query=${search}&exact=false`;

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });

  await page.waitForSelector(`div[style='max-width:381px;min-width:242px']`, {
    timeout: 0,
  });

  const items = await page.evaluate(() => {
    const products = Array.from(
      document.querySelectorAll("div[style='max-width:381px;min-width:242px']")
    ).map((product) => {
      let title = product.querySelector(
        "span[style='-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box']"
      );
      return {
        title: title ? title.textContent : "",
      };
    });
    return products;
  });
  console.log(items);
}

main();
