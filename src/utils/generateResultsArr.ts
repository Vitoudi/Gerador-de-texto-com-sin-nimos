import { sinonimosManager } from "../classes/Sinonimos";
import { GenerationMode } from "../types/types";
import { iterateAsync } from "./iterateAsync";

function formatResult(newWord: string, oldWord: string) {
  return `${newWord}{(${oldWord})}`;
}

function getPorcentage(total: number, current: number) {
    return Math.round((100 * current) / total)
}

export async function generateResultsArr(
  arr: string[],
  minWordLength = 4,
  mode = <GenerationMode>"discardOldWords"
) {
  const resultArr: string[] = [];

  await iterateAsync<string>(arr, async (item, i) => {
    let result = "";

    if (item.length < minWordLength) {
      result = item;
    } else {
      let synonym = await sinonimosManager.getSynonymFor(item);
      if (typeof synonym !== "string") return;
      mode === "preserveOldWords" && (synonym = formatResult(synonym, item));
      typeof synonym === "string" && (result = synonym);
    }

    resultArr.push(result);
    console.log(getPorcentage(arr.length, i) + '%')
  });

  return resultArr;
}
