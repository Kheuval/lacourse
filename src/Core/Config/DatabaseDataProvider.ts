import { databaseMediaObjectRepository } from "@/Domain/MediaObject/Repository/DatabaseMediaObjectRepository";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { databaseUserRepository } from "@/Domain/User/Repository/DatabaseUserRepository";
import type { DataProvider } from "../Config/DataProvider";
import { databaseAuthService } from "../Services/Auth/DatabaseAuthService";

export const databaseDataProvider: DataProvider = {
  authProvider: databaseAuthService,
  mediaObjectProvider: databaseMediaObjectRepository,
  recipeProvider: databaseRecipeRepository,
  userProvider: databaseUserRepository,
};
