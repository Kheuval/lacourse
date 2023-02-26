import type { Rule } from "../ValidationInterface";

export class NumberRule implements Rule {
  test(data: string) {
    let message = "";
    if (isNaN(parseInt(data))) {
      message = "Cette valeur doit être un nombre";
    }

    return {
      valid: !isNaN(parseInt(data)),
      message: message,
    };
  }
}
