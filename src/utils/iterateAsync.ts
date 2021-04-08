import { DynamicArr } from "./dynamicArr";

type Callback<T> = (...args: any[]) => Promise<any>;

let i = 0;
let iterationArr: DynamicArr<any>;

export async function iterateAsync<T>(arr: T[], callback: Callback<T>) {
  iterationArr = new DynamicArr<T>(arr);
  await iterate(iterationArr.values[i], callback);
}

async function iterate<T>(item: T | undefined, callback: Callback<T>): Promise<any> {
  if (!iterationArr) {
    throw new Error("must pass array for iteration");
  }

  if (!item) return;

  await callback(item, i);
  i++;
  return iterate(iterationArr.values[i], callback);
}
