import type { Rule } from "../RuleInterface";

export class NotNullRule implements Rule {
  test(data: string) {
    let message = "";
    if (!data) {
      message = "Ce champ ne peut pas être vide";
    }

    return {
      valid: !!data,
      message: message,
    };
  }
}
