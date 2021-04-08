export class DynamicArr<T> {
  values: Array<T>;

  constructor(arr: Array<T>) {
    this.values = arr;
  }

  public add(element: T) {
    this.values.push(element);
  }
}
