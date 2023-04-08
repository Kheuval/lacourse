import { databaseGroceryListRepository } from "@/Domain/GroceryList/Repository/DatabaseGroceryListRepository";
import { databaseMediaObjectRepository } from "@/Domain/MediaObject/Repository/DatabaseMediaObjectRepository";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { databaseUserRepository } from "@/Domain/User/Repository/DatabaseUserRepository";
import type { DataProvider } from "../Config/DataProvider";
import { databaseAuthService } from "../Services/Auth/DatabaseAuthService";
import { databaseIngredientRepository } from "@/Domain/Ingredient/Repository/DatabaseIngredientRepository";

export const databaseDataProvider: DataProvider = {
  authProvider: databaseAuthService,
  mediaObjectProvider: databaseMediaObjectRepository,
  recipeProvider: databaseRecipeRepository,
  userProvider: databaseUserRepository,
  groceryListProvider: databaseGroceryListRepository,
  ingredientProvider: databaseIngredientRepository,
};
