import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import type { User } from "../UserInterface";

export interface UserRepository {
  updateOneByIri(iri: string, data: object): Promise<User>;
  getFavorites(userIri: string): Promise<Recipe[]>;
  requestNewPassword(email: string): Promise<void>;
  resetPassword(password: string, token: string): Promise<void>;
}
