import type { RecipeIngredient } from "../RecipeIngredient/RecipeIngredientInterface";
import type { Step } from "../Step/StepInterface";

export interface Recipe {
  id: string;
  name: string;
  image: string;
  servings: number;
  totalTime: number;
  preparationTime: number;
  restTime: number;
  cookingTime: number;
  recipeIngredients: RecipeIngredient[];
  steps: Step[];
  type: string;
}
