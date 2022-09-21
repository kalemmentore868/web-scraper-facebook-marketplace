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
  const page = await browser.newPage();

  let iphoneInfoList = [];
  for (const link of links) {
    page.goto(link);

    await page.waitForFunction(
      `document.querySelectorAll("span[dir='auto']").length >= 50`
    );

    const title = await page.evaluate(() => {
      const title = document.querySelector(
        "div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div > div > div > div.k0kqjr44.alzwoclg.cqf1kptm.nswx41af.lq84ybu9.hf30pyar.l4a8l1zh.n4fburwq > div > div.rnkbzjac.alzwoclg.svm27lag.pytsy3co.om3e55n1.mfclru0v.ixo1fg0s.tcye5r3d > div > div.r7ybg2qv.qbc87b33.jk4gexc9.alzwoclg.cqf1kptm.lq84ybu9.g4tp4svg.ly56v2vv.h67akvdo.ir1gxh3s.sqler345.by1hb0a5.thmcm15y.cgu29s5g.i15ihif8.dnr7xe2t.id4k59z1.jfw19y2w.b95sz57d.mm05nxu8.izce65as.om3e55n1.qbfhvn0q.mfclru0v > div.alzwoclg.cqf1kptm.cgu29s5g.om3e55n1 > div:nth-child(1) > div.gt60zsk1.rl78xhln.r227ecj6.g4qalytl > div:nth-child(1) > span"
      );
      return title?.textContent;
    });

    const price = await page.evaluate(() => {
      const price = document.querySelector(
        "div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div > div > div > div.k0kqjr44.alzwoclg.cqf1kptm.nswx41af.lq84ybu9.hf30pyar.l4a8l1zh.n4fburwq > div > div.rnkbzjac.alzwoclg.svm27lag.pytsy3co.om3e55n1.mfclru0v.ixo1fg0s.tcye5r3d > div > div.r7ybg2qv.qbc87b33.jk4gexc9.alzwoclg.cqf1kptm.lq84ybu9.g4tp4svg.ly56v2vv.h67akvdo.ir1gxh3s.sqler345.by1hb0a5.thmcm15y.cgu29s5g.i15ihif8.dnr7xe2t.id4k59z1.jfw19y2w.b95sz57d.mm05nxu8.izce65as.om3e55n1.qbfhvn0q.mfclru0v > div.alzwoclg.cqf1kptm.cgu29s5g.om3e55n1 > div > div.gt60zsk1.rl78xhln.r227ecj6.g4qalytl > div:nth-child(2) > div > span"
      );
      const priceText = price?.textContent;
      if (priceText) {
        let onlyNumbers = priceText.replace(/\D/g, "");
        let noCommas = onlyNumbers.replace(/(\d+),(\d+\s?km)/g, "$1$2");
        return parseInt(noCommas);
      }
      return 0;
    });

    // const details = await page.evaluate(() => {
    //   const details = document.querySelector(
    //     "div > div:nth-child(1) > div > div:nth-child(9) > div > div > div.bdao358l.om3e55n1.g4tp4svg > div > div.alzwoclg.cqf1kptm.i7qc65dt.om3e55n1.g4tp4svg.ednat9xy > div.d65gybhy.qnh7f6wf.e3y1jsw0.lq84ybu9.hf30pyar.mfclru0v.nwqf8yqc.ff443qle.l4a8l1zh > div > div.k0kqjr44.alzwoclg.cqf1kptm.pytsy3co.nswx41af.lq84ybu9.hf30pyar.l4a8l1zh > div > div.rnkbzjac.alzwoclg.pytsy3co.om3e55n1.mfclru0v.ixo1fg0s.tcye5r3d.nf54edts > div.alzwoclg.cqf1kptm.jez8cy9q.mfclru0v.ixo1fg0s.tcye5r3d.svm27lag > div.r7ybg2qv.qbc87b33.jk4gexc9.alzwoclg.cqf1kptm.lq84ybu9.g4tp4svg.ly56v2vv.h67akvdo.ir1gxh3s.sqler345.by1hb0a5.thmcm15y.cgu29s5g.i15ihif8.dnr7xe2t.id4k59z1.jfw19y2w.b95sz57d.mm05nxu8.izce65as.om3e55n1.qbfhvn0q.mfclru0v > div.alzwoclg.cqf1kptm.cgu29s5g.om3e55n1 > div:nth-child(1) > div.om3e55n1.g4tp4svg.bdao358l.alzwoclg.cqf1kptm.jez8cy9q.gvxzyvdx.q6feio67.k0kqjr44 > div > div:nth-child(2) > div.n3t5jt4f.nch0832m.rj2hsocd.oxkhqvkx.s1m0hq7j > div > span"
    //   );
    //   return details?.textContent;
    // });

    iphoneInfoList.push({ title, price });
  }
  console.log(iphoneInfoList);
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

  // await page.evaluate(() => {
  //   return new Promise<void>((resolve, reject) => {
  //     let prev: number;
  //     const interval = setInterval(() => {
  //       console.log("in interval");
  //       const len = document.querySelectorAll(
  //         " div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div.rlvdr5c9.qneuxs76.h6ft4zvz.ir39z7dx.dhod7fyx > div > div.o18ful9l.alzwoclg.jl2a5g8c.o7bt71qk.t5n4vrf6.mmwt03ec.hnay576k.mtzt5fvk.rng1terr > div > div > div > span > div > div > a"
  //       ).length;

  //       if ((prev && prev === len) || len >= 150) {
  //         resolve();
  //         clearInterval(interval);
  //       }
  //       window.scrollBy({
  //         left: 0,
  //         top: document.documentElement.scrollHeight,
  //       });

  //       prev = len;
  //     }, 1000);
  //   });
  // });

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
