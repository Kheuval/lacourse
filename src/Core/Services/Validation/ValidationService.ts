import type { ValidationInterface } from "./ValidationInterface";
import type { Rule } from "./RuleType";

export const validationService = {
  validate: (rules: Rule[], data: string): ValidationInterface => {
    const result: ValidationInterface = {
      valid: true,
      message: "",
    };
    rules.every((rule) => {
      const test: ValidationInterface = rule(data);
      if (!test.valid) {
        result.valid = false;
        result.message = test.message;
        return false;
      }
      result.valid = true;
      return true;
    });
    return result;
  },
};
