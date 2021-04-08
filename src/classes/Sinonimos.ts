import { puppeteerManager } from "./puppeteer";
import { PageActions } from "../classes/PageActions";

class SinonimosManager extends PageActions {
  readonly URL: string;
  isInSinonimos: boolean;

  constructor() {
    super();
    this.URL = "https://www.sinonimos.com.br/";
    this.isInSinonimos = false;
  }

  public async getSynonymFor(term: string) {
    return await this.search(term);
  }

  private async search(term: string) {
    const SYNONYM_SELECTOR = ".sinonimo";
    const WRAPPER_SELECTOR = ".sinonimos";
    await puppeteerManager.goto(this.URL + term);
    await puppeteerManager.mainPage?.waitForNavigation();

    const found = await puppeteerManager.elementExits(SYNONYM_SELECTOR);
    const result = found
      ? await this.getTextContentFor(SYNONYM_SELECTOR)
      : term;
    return result;
  }
}

export const sinonimosManager = new SinonimosManager();
