import type { Recipe } from "../RecipeInterface";

export interface RecipeRepository {
  getAll(): Promise<Recipe[]>;
  getAllForUser(userIri: string): Promise<Recipe[]>;
  getSample(): Promise<Recipe[]>;
  findByQuery(query: string): Promise<Recipe[] | []>;
  findOneByIri(iri: string): Promise<Recipe>;
  create(recipe: Recipe): Promise<Recipe>;
  updateOneByIri(iri: string, recipe: Recipe): Promise<Recipe>;
  deleteOneByIri(iri: string): Promise<void>;
}
