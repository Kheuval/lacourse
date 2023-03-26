import type { GroceryListRepository } from "@/Domain/GroceryList/Repository/GroceryListRepositoryInterface";
import type { MediaObjectRepository } from "@/Domain/MediaObject/Repository/MediaObjectRepositoryInterface";
import type { RecipeRepository } from "@/Domain/Recipe/Repository/RecipeRepositoryInterface";
import type { UserRepository } from "@/Domain/User/Repository/UserRepositoryInterface";
import type { AuthServiceInterface } from "../Services/Auth/AuthServiceInterface";

export interface DataProvider {
  authProvider: AuthServiceInterface;
  mediaObjectProvider: MediaObjectRepository;
  recipeProvider: RecipeRepository;
  userProvider: UserRepository;
  groceryListProvider: GroceryListRepository;
}

export const provide = (dataProvider: DataProvider) => {
  return dataProvider;
};
