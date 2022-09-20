"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = __importStar(require("puppeteer"));
let browser;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        browser = yield puppeteer.launch({
            headless: false,
            defaultViewport: {
                height: 1020,
                width: 1080,
            },
        });
        const links = yield gatherLinks();
        console.log(links);
    });
}
main();
const gatherLinks = () => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield browser.newPage();
    const search = "iphone";
    const url = `https://www.facebook.com/marketplace/116087261735365/search?daysSinceListed=30&sortBy=best_match&query=${search}&exact=false`;
    yield page.goto(url);
    yield page.waitForFunction(`document.querySelectorAll(" div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div.rlvdr5c9.qneuxs76.h6ft4zvz.ir39z7dx.dhod7fyx > div > div.o18ful9l.alzwoclg.jl2a5g8c.o7bt71qk.t5n4vrf6.mmwt03ec.hnay576k.mtzt5fvk.rng1terr > div > div > div > span > div > div > a").length >= 20`, { timeout: 0 });
    yield page.evaluate(() => {
        return new Promise((resolve, reject) => {
            let prev;
            const interval = setInterval(() => {
                console.log("in interval");
                const len = document.querySelectorAll(" div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div.rlvdr5c9.qneuxs76.h6ft4zvz.ir39z7dx.dhod7fyx > div > div.o18ful9l.alzwoclg.jl2a5g8c.o7bt71qk.t5n4vrf6.mmwt03ec.hnay576k.mtzt5fvk.rng1terr > div > div > div > span > div > div > a").length;
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
    const links = yield page.evaluate(() => {
        const linksNodeList = document.querySelectorAll(" div > div:nth-child(1) > div > div.bdao358l.om3e55n1.g4tp4svg > div > div > div > div.alzwoclg.cqf1kptm.p1t2w4gn.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.jez8cy9q.t5n4vrf6.o9w3sbdw.sr926ui1.jl2a5g8c.alzwoclg.cgu29s5g.fawcizw8.om3e55n1.g4tp4svg > div.bdao358l.om3e55n1.g4tp4svg.cqf1kptm.gvxzyvdx.aeinzg81.jg3vgc78.cgu29s5g.i15ihif8.alzwoclg.fawcizw8 > div > div > div.rlvdr5c9.qneuxs76.h6ft4zvz.ir39z7dx.dhod7fyx > div > div.o18ful9l.alzwoclg.jl2a5g8c.o7bt71qk.t5n4vrf6.mmwt03ec.hnay576k.mtzt5fvk.rng1terr > div > div > div > span > div > div > a");
        const links = Array.from(linksNodeList).map((link) => {
            let url = link.href;
            return url;
        });
        return links;
    });
    yield page.close();
    return links;
});
