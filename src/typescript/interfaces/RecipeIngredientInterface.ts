import type { Ingredient } from "./IngredientInterface";
import type { Recipe } from "./RecipeInterface";

export interface RecipeIngredient {
  id: number;
  unit: string;
  quantity: number;
  ingredient: Ingredient;
  recipe: Recipe;
}
