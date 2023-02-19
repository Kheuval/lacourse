import type { Recipe } from "../RecipeInterface";

export interface RecipeRepository {
  getAll(): Promise<Recipe[]>;
  getSample(): Promise<Recipe[] | null>;
  findByQuery(query: string): Promise<Recipe[] | []>;
  findOneByIri(iri: string): Promise<Recipe | null>;
  create(recipe: Recipe): Promise<Recipe>;
  updateOneByIri(iri: string, recipe: Recipe): Promise<Recipe>;
  deleteOneByIri(iri: string): Promise<void>;
}
