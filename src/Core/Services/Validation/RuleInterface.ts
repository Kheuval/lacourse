import type { ValidationInterface } from "./ValidationInterface";

export interface Rule {
  test: (data: string) => ValidationInterface;
  options?: {};
}
