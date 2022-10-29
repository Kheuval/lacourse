import type { GroceryList } from "../GroceryList/GroceryListInterface";
import type { Ingredient } from "../Ingredient/IngredientInterface";
import type { Recipe } from "../Recipe/RecipeInterface";

export interface ListDetail {
  id: number;
  unit: string;
  quantity: number;
  isActive: boolean;
  groceryList: GroceryList;
  ingredient: Ingredient;
  recipe: Recipe;
}
