import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import type { User } from "../UserInterface";

export interface UserRepository {
  findOneByIri(iri: string): Promise<User | null>;
  updateOneByIri(iri: string, data: object): Promise<User>;
  deleteOneByIri(iri: string): Promise<void>;
  getFavorites(userIri: string): Promise<Recipe[]>;
  requestNewPassword(email: string): Promise<void>;
  resetPassword(password: string, token: string): Promise<void>;
}
