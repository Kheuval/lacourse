import type { GroceryList } from "./GroceryListInterface";
import type { Recipe } from "./RecipeInterface";

export interface User {
  id: number;
  email: string;
  username: string;
  recipes: Recipe[];
  favorites: Recipe[];
  groceryLists: GroceryList[];
}
