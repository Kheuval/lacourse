import type { GroceryList } from "./GroceryListInterface";
import type { Ingredient } from "./IngredientInterface";
import type { Recipe } from "./RecipeInterface";

export interface ListDetail {
  id: number;
  unit: string;
  quantity: number;
  isActive: boolean;
  groceryList: GroceryList;
  ingredient: Ingredient;
  recipe: Recipe;
}
