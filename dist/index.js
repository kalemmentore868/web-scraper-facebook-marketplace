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
const HEADLESS = false;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        browser = yield puppeteer.launch({ headless: HEADLESS });
        const page = yield browser.newPage();
        const search = "iphone";
        const url = `https://www.facebook.com/marketplace/116087261735365/search?daysSinceListed=30&sortBy=best_match&query=${search}&exact=false`;
        yield page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });
        yield page.waitForSelector(`div[style='max-width:381px;min-width:242px']`, {
            timeout: 0,
        });
        const items = yield page.evaluate(() => {
            const products = Array.from(document.querySelectorAll("div[style='max-width:381px;min-width:242px']")).map((product) => {
                let title = product.querySelector("span[style='-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box']");
                return {
                    title: title ? title.textContent : "",
                };
            });
            return products;
        });
        console.log(items);
    });
}
main();
