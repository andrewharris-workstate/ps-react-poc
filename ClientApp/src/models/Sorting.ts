import { SortHeader } from "./SortHeader";

export class Sorting {
  public header: SortHeader;
  public isDescending: boolean;

  constructor(header: SortHeader, isDescending: boolean) {
    this.header = header;
    this.isDescending = isDescending;
  }

  public static areEqual(a: Sorting, b: Sorting) {
    return a.header === b.header && a.isDescending === b.isDescending;
  }
}
