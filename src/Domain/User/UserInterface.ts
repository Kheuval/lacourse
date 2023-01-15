import type { GroceryList } from "../GroceryList/GroceryListInterface";
import type { Recipe } from "../Recipe/RecipeInterface";

export interface User {
  id: string;
  email: string;
  username: string;
  recipes: Recipe[];
  favorites: Recipe[];
  groceryLists: GroceryList[];
  type: string;
}
