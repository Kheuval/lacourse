import type { Ingredient } from "../Ingredient/IngredientInterface";
import type { Recipe } from "../Recipe/RecipeInterface";

export interface RecipeIngredient {
  id: number;
  unit: string;
  quantity: number;
  ingredient: Ingredient;
  recipe: Recipe;
}
