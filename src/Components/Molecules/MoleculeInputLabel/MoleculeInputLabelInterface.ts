import type { Rule } from "@/Core/Services/Validation/RuleType";

export interface MoleculeInputLabel {
  id: string;
  type: string;
  placeholder: string;
  validationRules?: Rule[];
}