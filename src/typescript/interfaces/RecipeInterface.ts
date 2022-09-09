import type { RecipeIngredient } from "./RecipeIngredientInterface";
import type { Step } from "./StepInterface";

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
