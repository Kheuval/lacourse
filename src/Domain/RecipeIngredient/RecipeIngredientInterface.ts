import type { Ingredient } from "../Ingredient/IngredientInterface";
import type { Recipe } from "../Recipe/RecipeInterface";

export interface RecipeIngredient {
  id: string;
  unit: string;
  quantity: number;
  ingredient: Ingredient;
  recipe: Recipe;
  type: "RecipeIngredient";
}
