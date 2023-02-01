import type { GroceryList } from "../GroceryList/GroceryListInterface";
import type { Ingredient } from "../Ingredient/IngredientInterface";
import type { Recipe } from "../Recipe/RecipeInterface";

export interface ListDetail {
  id: string;
  unit: string;
  quantity: number;
  isActive: boolean;
  groceryList: GroceryList;
  ingredient: Ingredient;
  recipe: Recipe;
  type: "ListDetail";
}
