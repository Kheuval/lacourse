import type { RecipeIngredient } from "@/Domain/RecipeIngredient/RecipeIngredientInterface";
import type { Step } from "@/Domain/Step/StepInterface";

export interface RecipeForm {
  name: string;
  image: string;
  servings: number;
  totalTime: number;
  preparationTime: number;
  restTime: number;
  cookingTime: number;
  recipeIngredients: RecipeIngredient[];
  steps: Step[];
}
