import fs from "fs";
import path from "path";

export function getFile(path: string) {
  return fs.readFileSync(path, { encoding: "utf-8" });
}

export function getArrayOfWordsFor(text: string): string[] {
  const formated = text.split(" ").map((item) =>
    item
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
  );
  return formated;
}

export function generateFileFromArray(arr: string[]) {
  fs.writeFileSync(
    path.join(__dirname, "../", "data", "result.txt"),
    arr.join(" ")
  );
  console.log('done')
}
