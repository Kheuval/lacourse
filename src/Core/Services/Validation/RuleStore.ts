import { defineStore } from "pinia";
import type { Rule } from "./RuleType";

export const useRuleStore = defineStore("rule", () => {
  const notNull: Rule = (data) => {
    let message = "";
    if (!data) {
      message = "Ce champ ne peut pas être vide";
    }

    return {
      valid: !!data,
      message: message,
    };
  };

  return { notNull };
});
