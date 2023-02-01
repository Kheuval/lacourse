import type { GroceryList } from "../GroceryList/GroceryListInterface";
import type { Recipe } from "../Recipe/RecipeInterface";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

export interface User extends AuthUser {
  recipes: Recipe[];
  favorites: Recipe[];
  groceryLists: GroceryList[];
  type: "User";
}
