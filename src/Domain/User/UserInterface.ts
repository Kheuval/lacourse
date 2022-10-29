import type { GroceryList } from "../GroceryList/GroceryListInterface";
import type { Recipe } from "../Recipe/RecipeInterface";

export interface User {
  id: number;
  email: string;
  username: string;
  recipes: Recipe[];
  favorites: Recipe[];
  groceryLists: GroceryList[];
}
