import * as fileManager from "./fileManager";
import { puppeteerManager } from "./classes/puppeteer";
import { generateResultsArr } from "./utils/generateResultsArr";
import { GenerationMode, isGenerationMode } from "./types/types";

const args = process.argv.slice(2);

async function main() {
  let MinWordLength = 4;
  let mode: GenerationMode = "discardOldWord";

  if (args.length < 2 && args.length !== 0)
    throw new Error("invalid number of args");
  if (args.length) {
    !isNaN(parseInt(args[0])) && (MinWordLength = parseInt(args[0]));
    isGenerationMode(args[1]) && (mode = args[1]);
  }

  await puppeteerManager.init();

  const FILE_PATH = "./data/test.txt";
  const fileContent = fileManager.getFile(FILE_PATH);
  const formated = fileManager.getArrayOfWordsFor(fileContent);

  const resultArr = await generateResultsArr(
    formated,
    parseInt(args[0]),
    <GenerationMode>args[1]
  );
  fileManager.generateFileFromArray(resultArr);
  puppeteerManager.end();
}

main();
