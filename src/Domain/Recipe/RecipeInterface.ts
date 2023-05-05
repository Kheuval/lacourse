import type { RecipeIngredient } from "../RecipeIngredient/RecipeIngredientInterface";
import type { Step } from "../Step/StepInterface";
import type { User } from "../User/UserInterface";

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
  type: "Recipe";
  user: User;
}
