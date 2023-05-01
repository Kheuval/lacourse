import type { GroceryList } from "../GroceryList/GroceryListInterface";
import type { Ingredient } from "../Ingredient/IngredientInterface";

export interface ListDetail {
  id: string;
  unit: string;
  quantity: number;
  isActive: boolean;
  groceryList: GroceryList;
  ingredient: Ingredient;
  type: "ListDetail";
}
