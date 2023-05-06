import type { Rule } from "../ValidationInterface";
import { useEmailRegex } from "@/Core/Composables/useEmailRegex";

export class EmailRule implements Rule {
  test(data: string) {
    let message = "";

    if (!useEmailRegex(data)) {
      message = "Le format de l'email n'est pas valide";
    }

    return {
      valid: useEmailRegex(data),
      message: message,
    };
  }
}
