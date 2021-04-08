import puppeteer, { Browser, Page } from "puppeteer";
import { Selector } from "../types/types";

class PuppeteerManager {
  private browser: Browser | null;
  public mainPage: Page | null;

  constructor() {
    this.browser = null;
    this.mainPage = null;
  }

  public async init(headless = true) {
    this.browser = await puppeteer.launch({ headless });
    this.mainPage = await this.browser.newPage();
  }

  public async goto(url: string) {
    if (!this.browser || !this.mainPage) {
      throw new Error("must init first");
    }

    this.mainPage.goto(url);
  }

  public async elementExits(selector: Selector) {
    return await this.mainPage?.evaluate((selector) => {
      return document.querySelector(selector) ? true : false;
    }, selector);
  }

  public end() {
    this.browser?.close();
  }
}

export const puppeteerManager = new PuppeteerManager();
