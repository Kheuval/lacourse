import type { Ingredient } from "../Ingredient/IngredientInterface";

export interface RecipeIngredient {
  id: string;
  unit: string;
  quantity: number;
  ingredient: Ingredient;
  type: "RecipeIngredient";
}
