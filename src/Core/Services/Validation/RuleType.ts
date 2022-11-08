import type { ValidationInterface } from "./ValidationInterface";

export type Rule = {
  (data: string): ValidationInterface;
};
