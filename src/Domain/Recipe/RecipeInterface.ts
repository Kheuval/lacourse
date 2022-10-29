import type { RecipeIngredient } from "../RecipeIngredient/RecipeIngredientInterface";
import type { Step } from "../Step/StepInterface";

export interface Recipe {
  id: number;
  name: string;
  imageUri: string;
  servings: number;
  totalTime: number;
  prepTime: number;
  restTime: number;
  cookingTime: number;
  recipeIngredients: RecipeIngredient[];
  steps: Step[];
}
