import * as puppeteer from "puppeteer";

let browser: puppeteer.Browser;

async function main() {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      height: 1020,
      width: 1080,
    },
  });

  const links = await gatherLinks();
  console.log(links);
}

main();

const gatherLinks = async () => {
  const page = await browser.newPage();

  const search = "iphone";

  const url = `https://www.facebook.com/marketplace/116087261735365/search?daysSinceListed=30&sortBy=best_match&query=${search}&exact=false`;
  await page.goto(url);

  await page.waitForFunction(
    `document.querySelectorAll(" div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div.rlvdr5c9.qneuxs76.h6ft4zvz.ir39z7dx.dhod7fyx > div > div.o18ful9l.alzwoclg.jl2a5g8c.o7bt71qk.t5n4vrf6.mmwt03ec.hnay576k.mtzt5fvk.rng1terr > div > div > div > span > div > div > a").length >= 20`,
    { timeout: 0 }
  );

  await page.evaluate(() => {
    return new Promise<void>((resolve, reject) => {
      let prev: number;
      const interval = setInterval(() => {
        console.log("in interval");
        const len = document.querySelectorAll(
          " div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div.rlvdr5c9.qneuxs76.h6ft4zvz.ir39z7dx.dhod7fyx > div > div.o18ful9l.alzwoclg.jl2a5g8c.o7bt71qk.t5n4vrf6.mmwt03ec.hnay576k.mtzt5fvk.rng1terr > div > div > div > span > div > div > a"
        ).length;

        if ((prev && prev === len) || len >= 150) {
          resolve();
          clearInterval(interval);
        }
        window.scrollBy({
          left: 0,
          top: document.documentElement.scrollHeight,
        });

        prev = len;
      }, 1000);
    });
  });

  const links = await page.evaluate(() => {
    const linksNodeList: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll(
        " div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div.rlvdr5c9.qneuxs76.h6ft4zvz.ir39z7dx.dhod7fyx > div > div.o18ful9l.alzwoclg.jl2a5g8c.o7bt71qk.t5n4vrf6.mmwt03ec.hnay576k.mtzt5fvk.rng1terr > div > div > div > span > div > div > a"
      );
    const links = Array.from(linksNodeList).map((link: HTMLAnchorElement) => {
      let url = link.href;
      return url;
    });
    return links;
  });

  await page.close();
  return links;
};
