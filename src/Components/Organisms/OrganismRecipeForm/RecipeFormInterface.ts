import type { RecipeIngredient } from "@/Domain/RecipeIngredient/RecipeIngredientInterface";
import type { Step } from "@/Domain/Step/StepInterface";

export interface RecipeForm {
  name: string;
  image?: string;
  servings: number | undefined;
  totalTime: number | undefined;
  preparationTime: number | undefined;
  restTime: number | undefined;
  cookingTime: number | undefined;
  recipeIngredients: RecipeIngredient[];
  steps: Step[];
}
