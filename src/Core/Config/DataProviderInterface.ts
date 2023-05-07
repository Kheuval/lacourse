import type { GroceryListRepository } from "@/Domain/GroceryList/Repository/GroceryListRepositoryInterface";
import type { MediaObjectRepository } from "@/Domain/MediaObject/Repository/MediaObjectRepositoryInterface";
import type { RecipeRepository } from "@/Domain/Recipe/Repository/RecipeRepositoryInterface";
import type { UserRepository } from "@/Domain/User/Repository/UserRepositoryInterface";
import type { AuthServiceInterface } from "../Services/Auth/AuthServiceInterface";
import type { IngredientRepository } from "@/Domain/Ingredient/Repository/IngredientRepositoryInterface";
import type { InjectionKey } from "vue";

export interface DataProvider {
  authProvider: AuthServiceInterface;
  mediaObjectProvider: MediaObjectRepository;
  recipeProvider: RecipeRepository;
  userProvider: UserRepository;
  groceryListProvider: GroceryListRepository;
  ingredientProvider: IngredientRepository;
}

export const DataProviderKey: InjectionKey<DataProvider> =
  Symbol("dataProvider");
