import { puppeteerManager } from "./puppeteer";
import { Selector } from "../types/types";

export class PageActions {

  public async getTextContentFor(selector: Selector) {
    return new Promise(async (resolve, reject) => {
      const resolveFunctionHasAlreadyBeenDeclered = Boolean(
        (<any>puppeteerManager.mainPage)?._pageBindings.get("resolve")
      );

      if (resolveFunctionHasAlreadyBeenDeclered) {
        (<any>puppeteerManager.mainPage)?._pageBindings.set("resolve", resolve);
      } else {
        await puppeteerManager.mainPage?.exposeFunction("resolve", resolve);
      }

      await this.EvalInPage(selector, (element) => {
        const text = element.textContent;
        resolve(text);
      });
    });
  }

  private async EvalInPage(
    selector: Selector,
    callback: (element: Element, ...args: any) => void,
    ...args: any[]
  ) {
    await puppeteerManager.mainPage?.$eval(selector, callback, ...args);
  }
}
