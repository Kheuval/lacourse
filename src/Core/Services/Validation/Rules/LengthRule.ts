import type { Rule } from "../RuleInterface";

export class LengthRule implements Rule {
  options:
    | { minLength: number }
    | { maxLength: number }
    | { minLength: number; maxLength: number };

  constructor(
    options:
      | { minLength: number }
      | { maxLength: number }
      | { minLength: number; maxLength: number }
  ) {
    this.options = options;
  }

  test(data: string) {
    let message = "";
    let result = true;

    if ("minLength" in this.options && "maxLength" in this.options) {
      result =
        data.length >= this.options.minLength &&
        data.length <= this.options.maxLength;

      if (!result) {
        message = `Le champ doit faire entre ${this.options.minLength} et ${this.options.maxLength} caractères`;
      }
    } else if ("minLength" in this.options) {
      result = data.length >= this.options.minLength;

      if (!result) {
        message = `Le champ doit faire au moins ${this.options.minLength} caractères`;
      }
    } else if ("maxLength" in this.options) {
      result = data.length <= this.options.maxLength;

      if (!result) {
        message = `Le champ ne doit pas faire plus de ${this.options.maxLength} caractères`;
      }
    }

    return {
      valid: result,
      message: message,
    };
  }
}
