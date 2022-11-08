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

  const checkPasswords = {
    rule: (data) => {
      if (data !== checkPasswords.options.data) {
        console.log('failed');
      } else {
        console.log('success');
      }
    },
    options: { data: "toto" },
  };

  return { notNull, checkPasswords };
});
